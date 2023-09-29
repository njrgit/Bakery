using System.Security.AccessControl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Commands
{
    public class DeleteProductCommand : IRequest
    {
        public Guid Id { get; set; }
    }

    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
    {
        private readonly DataContext dataContext;
        public DeleteProductCommandHandler(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var product = await dataContext.Products.FindAsync(request.Id);

            dataContext.Remove(product);

            await dataContext.SaveChangesAsync();
        }
    }
}