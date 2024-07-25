package com.CSIT321.DeliverYey.Controller;

import com.CSIT321.DeliverYey.Entity.ProductEntity;
import com.CSIT321.DeliverYey.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:5173") // Update with your front-end URL
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ProductEntity insertProduct(@RequestBody ProductEntity product) {
        System.out.println("Inserting product: " + product);
        return productService.insertProduct(product);
    }

    @GetMapping
    public Iterable<ProductEntity> getAllProducts() {
        return productService.getProducts();
    }

    @GetMapping(params = "category")
    public Iterable<ProductEntity> getProductsByCategory(@RequestParam String category) {
        return productService.getProductsByCategory(category);
    }

    @GetMapping(params = "id")
    public ProductEntity getProduct(@RequestParam int id) {
        return productService.getProductById(id);
    }

    @GetMapping("/image")
    public String getProductImage(@RequestParam int id) {
        return productService.getProductFilenameById(id);
    }

    @PutMapping
    public ProductEntity updateProduct(@RequestBody ProductEntity product, @RequestParam int id) throws NoSuchFieldException {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping
    public String deleteProduct(@RequestParam int id) {
        System.out.println("Delete request for product ID: " + id);
        return productService.deleteProduct(id);
    }
}
