using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Category { get; set; }
        public double Price { get; set; }
    }
}