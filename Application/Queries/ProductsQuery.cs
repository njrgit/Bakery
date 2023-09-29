using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Queries
{
    public class ProductsQuery : IRequest<List<Product>> { }

    public class ProductQueryHandler : IRequestHandler<ProductsQuery, List<Product>>
    {
        private readonly DataContext dataContext;
        public ProductQueryHandler(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<List<Product>> Handle(ProductsQuery request, CancellationToken cancellationToken)
        {
            return await dataContext.Products.ToListAsync();
        }
    }
}