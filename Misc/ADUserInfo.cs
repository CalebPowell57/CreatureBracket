using System;
using System.DirectoryServices;

namespace CreatureBracket.Misc
{
    public class ADUserInfo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }

        public static ADUserInfo GetByUserName(string userName)
        {
            //using (DirectorySearcher dsSearcher = new DirectorySearcher())
            //{
            //    dsSearcher.Filter = $"(&(objectClass=user) (userPrincipalName={userName}))";
            //    SearchResult result = dsSearcher.FindOne();

            //    using (DirectoryEntry user = new DirectoryEntry(result.Path))
            //    {
            //        byte[] image = user.Properties["thumbnailPhoto"].Value as byte[];

            //        if (image is null)
            //        {
            //            throw new Exception("ADUserInfo.GetByUserName() - User image is null.");
            //        }

            //        var userInfo = new ADUserInfo
            //        {
            //            FirstName = user.Properties["givenName"].Value as string,
            //            LastName = user.Properties["sn"].Value as string,
            //            Image = $"data:image/jpeg;base64,{Convert.ToBase64String(image)}"
            //        };

            //        return userInfo;
            //    }
            //}

            return new ADUserInfo { FirstName = "Caleb", LastName = "Powell", Image = null };
        }
    }
}
