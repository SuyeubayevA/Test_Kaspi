using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPlusCore.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPlusCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoodsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public GoodsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select
                                Id,
                                Name,
                                ImgSrc,
                                Price
                             from dbo.Good
                            ";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MainConnection");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Good good)
        {
            string query = @"insert into dbo.Good
                                (Name,
                                ImgSrc,
                                Price)
                             values(@GoodName, @GoodImg, @GoodPrice)
                            ";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MainConnection");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@GoodName", good.Name);
                    cmd.Parameters.AddWithValue("@GoodImg", good.ImgSrc);
                    cmd.Parameters.AddWithValue("@GoodPrice", good.Price);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }

            return new JsonResult("Add Successfully");
        }

        [HttpPut]
        public JsonResult Put(Good good)
        {
            string query = @"update dbo.Good
                                set Name=@GoodName,
                                ImgSrc=@GoodImg,
                                Price=@GoodPrice
                             where Id=@GoodId
                            ";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MainConnection");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@GoodId", good.Id);
                    cmd.Parameters.AddWithValue("@GoodName", good.Name);
                    cmd.Parameters.AddWithValue("@GoodImg", good.ImgSrc);
                    cmd.Parameters.AddWithValue("@GoodPrice", good.Price);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }

            return new JsonResult("Update Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from dbo.Good
                             where Id=@GoodId
                            ";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MainConnection");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@GoodId", id);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }

            return new JsonResult("Delete Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + fileName;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(fileName); 
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }
    }
}
