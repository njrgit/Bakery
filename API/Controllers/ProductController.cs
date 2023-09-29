using Application.Commands;
using Application.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await Mediator.Send(new ProductsQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProducts(Guid id)
        {
            return await Mediator.Send(new SingleProductQuery { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            await Mediator.Send(new CreateProductCommand { Product = product });

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(Guid id, Product product)
        {
            product.Id = id;
            await Mediator.Send(new EditSingleProductCommand { Product =product});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            await Mediator.Send(new DeleteProductCommand { Id = id});
            return Ok();
        }
    }
}