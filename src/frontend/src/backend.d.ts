import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    name: string;
    description: string;
}
export type Time = bigint;
export interface Inquiry {
    name: string;
    email: string;
    company: string;
    message: string;
    timestamp: Time;
}
export interface Product {
    id: bigint;
    region: string;
    inStock: boolean;
    name: string;
    description: string;
    currency: string;
    category: string;
    price: number;
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllProducts(): Promise<Array<Product>>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getServices(): Promise<Array<Service>>;
    submitInquiry(name: string, email: string, company: string, message: string): Promise<void>;
}
