using CreatureBracket.Misc;

namespace CreatureBracket.Repositories
{
    public class AccountRepository : BaseRepository
    {
        public AccountRepository(DatabaseContext context) : base(context) { }

        public ADUserInfo GetInformation(string userName)
        {
            var userInfo = ADUserInfo.GetByUserName(userName);

            return userInfo;
        }
    }
}
