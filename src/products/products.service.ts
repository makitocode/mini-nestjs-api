import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(prodId: string) {
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.products[index] = updateProduct;
  }

  deleteProduct(id: string) {
    const index = this.findProduct(id)[1];
    this.products.splice(index, 1);
  }
  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((p) => p.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return [product, productIndex];
  }
}
