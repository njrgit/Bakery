using Application.Common;
using Domain;
using MediatR;
using Persistence;

namespace Application.Queries
{
    public class SingleProductQuery : IRequest<Result<Product>>
    {
        public Guid Id { get; set; }
    }

    public class SingleProductQueryHandler : IRequestHandler<SingleProductQuery, Result<Product>>
    {
        private readonly DataContext dataContext;
        public SingleProductQueryHandler(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public async Task<Result<Product>> Handle(SingleProductQuery request, CancellationToken cancellationToken)
        {
            var product = await dataContext.Products.FindAsync(request.Id);

            return new Result<Product>(true, product);
        }
    }
}