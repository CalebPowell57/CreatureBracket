namespace CreatureBracket.Misc
{
    public static class Globals
    {
        public static string ApplicationUrl
        {
            get
            {
                return _applicationUrl;
            }
            set
            {
                //only want to set this the first time as the first time will be our base url
                if (_applicationUrl is null)
                {
                    _applicationUrl = value;
                }
            }
        }
        private static string _applicationUrl = null;
    }
}
