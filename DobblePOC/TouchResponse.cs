using DobbleCardsGameLib;

namespace DobblePOC
{
    public struct TouchResponse
    {
        public TouchStatus Status { get; set; }
        public DobbleCard CenterCard { get; set; }
    }
}
