import { makeAutoObservable, runInAction } from "mobx"
import { Product } from "../models/product"
import httpClient from "../api/httpclient";
import { v4 as uuidv4 } from "uuid";

export default class ProductStore
{
    products: Product[] = [];
    editMode: boolean = false;
    loading: boolean = false;
    selectedProduct: Product | undefined = undefined;

    constructor()
    {
        makeAutoObservable(this)
    }

    get getProductsInAlphabeticalOrder()
    {
        return this.products.slice().sort((a, b) => a.name.localeCompare(b.name));
    }

    loadProducts = async () =>
    {
        this.setLoading(true)
        try
        {
            const productsFromApi = await httpClient.Products.list();
            this.setProducts(productsFromApi);
            this.setLoading(false);
        } catch (error)
        {
            console.log("Error Fired")
            console.log(error);
            this.setLoading(false);
        }
    }

    loadProduct = async (id: string) =>
    {
        let productToReturn = this.products.find(p => p.id === id);

        if (productToReturn)
        {
            this.setSelectedProductUsingProduct(productToReturn);
            console.log(`Product set in store ${productToReturn.id}`)
            return productToReturn;
        } else
        {
            this.setLoading(true);

            try
            {
                productToReturn = await httpClient.Products.getProduct(id);
                this.setSelectedProductUsingProduct(productToReturn);
                this.setLoading(false);
                return productToReturn;
            } catch (error)
            {
                console.log(error)
            }

        }
    }

    setProducts = (productsFromApi: Product[]) =>
    {
        this.products = productsFromApi;
    }

    setLoading = (loading: boolean) =>
    {
        this.loading = loading;
    }

    setEditMode = (editMode: boolean) =>
    {
        this.editMode = editMode;
    }

    setSelectedProduct = (id: string) =>
    {
        this.selectedProduct = this.products.find(x => x.id === id);
    }

    setSelectedProductUsingProduct = (product: Product) =>
    {
        this.selectedProduct = product;
    }


    cancelSelectedProduct = () =>
    {
        this.selectedProduct = undefined;
    }

    openForm = (id?: string) =>
    {
        console.log(id)
        id ? this.setSelectedProduct(id) : this.cancelSelectedProduct();
        this.setEditMode(true)
        console.log(this.editMode);
    }

    createProduct = async (product: Product) =>
    {
        this.setLoading(true);
        product.id = uuidv4();

        try
        {
            await httpClient.Products.create(product);
            runInAction(() =>
            {
                this.products.push(product);
                this.setSelectedProduct(product.id);
                this.setEditMode(false);
                this.setLoading(false);
            });

        } catch (error)
        {
            console.log("Error Fired")
            console.log(error);
            this.setLoading(false);
        }
    }

    updateProduct = async (product: Product) =>
    {
        this.setLoading(true);
        try
        {
            await httpClient.Products.update(product);
            runInAction(() =>
            {
                this.products = this.products.filter(p => p.id !== product.id);
                this.products.push(product);
                this.setSelectedProduct(product.id);
                this.setEditMode(false);
                this.setLoading(false);
            });

        } catch (error)
        {
            console.log("Error Fired")
            console.log(error);
            this.setLoading(false);
        }
    }

    deleteProduct = async (id: string) =>
    {
        this.setLoading(true);
        try
        {
            await httpClient.Products.delete(id);
            runInAction(() =>
            {
                this.products = this.products.filter(p => p.id !== id);
                this.setLoading(false);
            });
        } catch (error)
        {
            console.log("Error Fired")
            console.log(error);
            this.setLoading(false);
        }
    }

    closeForm = () =>
    {
        this.setEditMode(false);
    }
}