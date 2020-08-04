using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DobbleCardsGameLib
{
    public class DobbleCard
    {
        public List<int> Values { get; }

        public DobbleCard(int firstValue) => Values = new List<int> { firstValue };
        public DobbleCard() => Values = new List<int>(); // don't remove this constructor used by binding in controller !
        public DobbleCard(List<int> values) => Values = values;
        public static bool operator ==(DobbleCard dc1, DobbleCard dc2) => dc1.Values.SequenceEqual(dc2.Values);
        public static bool operator !=(DobbleCard dc1, DobbleCard dc2) => !(dc1 == dc2);
        public override bool Equals(object obj) => Values.Equals(obj);
        public override int GetHashCode() => HashCode.Combine(Values);        

        public override string ToString()
        {
            StringBuilder stringBuilder = new StringBuilder();
            foreach (var value in Values)
                stringBuilder.Append(value + "-");

            return stringBuilder.Remove(stringBuilder.Length - 1, 1).ToString();
        }


    }
}
