using System.Collections.Generic;
using System.Text;

namespace DobbleCardsGameLib
{
    public class DobbleCard
    {
        public List<int> Values { get; }


        public DobbleCard() => Values = new List<int>();
        public DobbleCard(int firstValue) => Values = new List<int> { firstValue };
        public DobbleCard(List<int> values) => Values = values;


        public override string ToString()
        {
            StringBuilder stringBuilder = new StringBuilder();
            foreach (var value in Values)
                stringBuilder.Append(value + "-");

            return stringBuilder.Remove(stringBuilder.Length - 1, 1).ToString();
        }
    }
}
