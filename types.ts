export default interface Ticket {
    map(arg0: (ticket: any) => import("react").JSX.Element): import("react").ReactNode;
    email: string;
    name: string;
    bookingTime?: Date;
    passengers: number;
    source: string;
    destination: string;
    paymentVerification?: Date | null;
    createdAt?: Date;
    stripeId?: string | null;
    qrImage?: string | null;
    totalAmount?: number;
}
export default interface User {
    email: string;
    name: string;
    createdAt?: Date;
    image?:string;
    emailVerified?: any;

}