using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Products.Any())
            {
                return;
            }

            var products = new List<Product>()
            {
                new() {
                    Name = "Beef Curry Bun",
                    Category = "Savoury",
                    Description = "Sri Lankan roasted beef stuffed in a bun",
                    Price = 4.50
                },
                new() {
                    Name = "Seeni Sambol Bun",
                    Category = "Savoury",
                    Description = "Sri Lankan caramelised onion stuffed in a bun",
                    Price = 4.50
                }
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}