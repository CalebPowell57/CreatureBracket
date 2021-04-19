using System.Collections.Generic;
using static CreatureBracket.Misc.Constants;

namespace CreatureBracket.DTOs.Requests
{
    public class ImageRequestDTO
    {
        public EImageType Type { get; set; }
        public List<string> Keys { get; set; }
    }
}
