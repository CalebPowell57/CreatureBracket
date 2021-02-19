using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.Models
{
    public class User : BaseModel
    {
        public EUserType Type { get; set; }
        //likely going to make this work with active directory at some point so leaving mostly blank for now.
    }
}
