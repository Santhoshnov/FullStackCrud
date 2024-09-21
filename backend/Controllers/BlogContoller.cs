using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BlogController : ControllerBase
{
    private readonly BlogContext _context;

    public BlogController(BlogContext context)
    {
        _context = context;
    }

    // GET: api/blog
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Blog>>> GetBlogs()
    {
        return await _context.Blog.ToListAsync();
    }

    // POST: api/blog
    [HttpPost]
    public async Task<ActionResult<Blog>> CreateBlog(Blog blog)
    {
        _context.Blog.Add(blog);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBlogs), new { id = blog.Id }, blog);
    }

    // PUT: api/blog/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBlog(int id, Blog blog)
    {
        if (id != blog.Id)
        {
            return BadRequest();
        }

        _context.Entry(blog).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/blog/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBlog(int id)
    {
        var blog = await _context.Blog.FindAsync(id);
        if (blog == null)
        {
            return NotFound();
        }

        _context.Blog.Remove(blog);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
