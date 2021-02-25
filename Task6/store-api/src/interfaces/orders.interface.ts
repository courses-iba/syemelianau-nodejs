interface OrderedProduct {
    _id: string;
    productId: string;
    count: number;
}

export interface Order {
    _id: string;
    userId: string;
    date: Date;
    total: number;
    products: Array<OrderedProduct>;
}
