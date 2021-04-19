using System;
using System.Collections.Generic;
using System.DirectoryServices;

namespace CreatureBracket.Misc
{
    public class ADUserInfo
    {
        public static Dictionary<string, ADUserInfo> Cache { get; private set; } = new Dictionary<string, ADUserInfo>();

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }

        public static ADUserInfo GetByUserName(string userName)
        {
            if (Cache.ContainsKey(userName))
            {
                return Cache[userName];
            }

            using (DirectorySearcher dsSearcher = new DirectorySearcher())
            {
                dsSearcher.Filter = $"(&(objectClass=user) (userPrincipalName={userName}))";
                SearchResult result = dsSearcher.FindOne();

                using (DirectoryEntry user = new DirectoryEntry(result.Path))
                {
                    byte[] image = user.Properties["thumbnailPhoto"].Value as byte[];

                    if (image is null)
                    {
                        throw new Exception("ADUserInfo.GetByUserName() - User image is null.");
                    }

                    var userInfo = new ADUserInfo
                    {
                        FirstName = user.Properties["givenName"].Value as string,
                        LastName = user.Properties["sn"].Value as string,
                        Image = $"data:image/jpeg;base64,{Convert.ToBase64String(image)}"
                    };

                    Cache.Add(userName, userInfo);

                    return userInfo;
                }
            }
        }
    }
}
