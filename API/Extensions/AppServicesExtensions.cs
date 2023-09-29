using Application.Common;
using Application.Queries;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class AppServicesExtensions
    {
        const string CorsPolicy = "CorsPolicy";

        public static IServiceCollection AddAppServices(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            serviceCollection.AddEndpointsApiExplorer();
            serviceCollection.AddSwaggerGen();
            serviceCollection.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });

            serviceCollection.AddCors(opt =>
            {
                opt.AddPolicy(CorsPolicy, policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });

            serviceCollection.AddMediatR(opt => opt.RegisterServicesFromAssembly(typeof(ProductsQuery).Assembly));
            serviceCollection.AddAutoMapper(typeof(Mapper).Assembly);

            return serviceCollection;
        }
    }
}