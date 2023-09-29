using Domain;
using MediatR;
using Persistence;

namespace Application.Queries
{
    public class SingleProductQuery : IRequest<Product>
    {
        public Guid Id { get; set; }
    }

    public class SingleProductQueryHandler : IRequestHandler<SingleProductQuery, Product>
    {
        private readonly DataContext dataContext;
        public SingleProductQueryHandler(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public async Task<Product> Handle(SingleProductQuery request, CancellationToken cancellationToken)
        {
            return await dataContext.Products.FindAsync(request.Id);
        }
    }
}