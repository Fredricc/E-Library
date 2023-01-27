using System.ComponentModel.DataAnnotations.Schema;

namespace E_Library.Model.Entities
{
    [Table("Library")]
    public class Library
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Telephone { get; set; }
    }
}
