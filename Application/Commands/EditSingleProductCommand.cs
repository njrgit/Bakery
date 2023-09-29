using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Commands
{
    public class EditSingleProductCommand : IRequest
    {
        public Product Product { get; set; }
    }

    public class EditSingleProductCommandHandler : IRequestHandler<EditSingleProductCommand>
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;
        public EditSingleProductCommandHandler(DataContext dataContext, IMapper mapper)
        {
            this.mapper = mapper;
            this.dataContext = dataContext;
        }

        public async Task Handle(EditSingleProductCommand request, CancellationToken cancellationToken)
        {
            var product = await dataContext.Products.FindAsync(request.Product.Id);
            mapper.Map(request.Product,product);
            await dataContext.SaveChangesAsync();
        }
    }
}