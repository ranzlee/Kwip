using System.ComponentModel.DataAnnotations;
using Reinforced.Typings.Attributes;

namespace Kwip.Domain
{
    [TsInterface]
    public class Entity
    {
        [Key]
        public int Id { get; set; }
    }
}
