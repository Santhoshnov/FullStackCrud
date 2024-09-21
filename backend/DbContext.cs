using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend
{
    public class BlogContext : DbContext
    {
        public DbSet<Blog> Blog { get; set; }

        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        {
        }
    }
}
