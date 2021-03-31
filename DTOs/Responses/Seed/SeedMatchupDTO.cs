using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CreatureBracket.DTOs.Responses
{
    public class SeedMatchupDTO
    {
        public List<CreatureSeedDTO> Contestants { get; set; }
        public int MatchupSeed { get; set; }
    }
}
