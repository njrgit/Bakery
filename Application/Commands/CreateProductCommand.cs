using Domain;
using MediatR;
using Persistence;

namespace Application.Commands
{
    public class CreateProductCommand : IRequest
    {
        public Product Product { get; set; }
    }

    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand>
    {
        private readonly DataContext dataContext;
        public CreateProductCommandHandler(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            dataContext.Products.Add(request.Product);

            await dataContext.SaveChangesAsync();
        }
    }
}