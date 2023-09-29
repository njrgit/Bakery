using AutoMapper;
using Domain;

namespace Application.Common
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Product, Product>();   
        }
    }
}