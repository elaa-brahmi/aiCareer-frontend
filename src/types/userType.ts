export interface User {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    accessToken?: string;
    password_hash?: string;
    google_id?: string;
    github_id?: string;
    avatar_url?: string;
    status:string;
    plan?: string;
    price_id?:string;
    created_at: string;
    updated_at?: string;
    stripe_customer_id?:string;
    stripe_subscription_id?: string;
    chat_messages_this_week?: number;
    cover_letters_this_week?: number;
    uploads_this_month?: number;
    plan_expires_at?: string;
}
export interface signedUpUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

}