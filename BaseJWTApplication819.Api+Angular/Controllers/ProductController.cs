using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BaseJWTApplication819.DataAccess;
using BaseJWTApplication819.DataAccess.Entity;
using BaseJWTApplication819.DTO.Models;
using BaseJWTApplication819.DTO.Models.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BaseJWTApplication819.Api_Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly EFContext _context;

        public ProductController(EFContext context)
        {
            _context = context;
        }
        //[HttpGet]
        //public List<ProductDTO> getAllProducts()
        //{
        //    var data = _context.Products.Select(t => new ProductDTO
        //    {
        //        Id=t.Id,
        //        Description=t.Description,
        //        Image=t.ImageURL,
        //        Price=t.Price,
        //        Title=t.Title
        //    }).ToList();

        //    return data;
        //}
        //[Authorize(Roles = "Admin")]
        //[HttpPost("addProduct")]
        //public async Task<ResultDTO> AddNewProduct([FromBody] ProductDTO product)
        //{
            
        //    Product newProduct = new Product();
        //    newProduct.Description = product.Description;
        //    newProduct.Id = _context.Products.Last().Id + 1;
        //    newProduct.ImageURL = product.Image;
        //    newProduct.Price = product.Price;
        //    newProduct.Title = product.Title;



        //   await _context.Products.AddAsync(newProduct);
        //  await _context.SaveChangesAsync();
            
        //    return new ResultDTO
        //    {
        //        Status = 200,
        //        Message = "Add new Item"
        //    };
        //}
        //[Authorize(Roles = "Admin")]
        //[HttpPost]
        //public async Task<ResultDTO> DeleteProduct([FromBody] int id)
        //{


        //    if (_context.Products.FirstOrDefault(x => x.Id == id) != null)
        //    {
        //        _context.Products.Remove(_context.Products.FirstOrDefault(x => x.Id == id));
        //       await _context.SaveChangesAsync();

        //        return new ResultDTO
        //        {
        //            Status = 200,
        //            Message = "Item removed"
        //        };
        //    }
        //    else
        //    {
        //        return new ResultErrorDTO
        //        {
        //            Status = 600,
        //            Message = "Error",
        //            Errors = new List<string>
        //            {
        //                "Error on Server"
        //            }
        //        };
        //    }


           
        //}

    }
}
