export interface IUser {
    avatar: string;
    username: string;
    last_name: string;
    first_name: string;
    display_name: string;
}
export interface IEvent {
    name: string;
    description: any;
    create_time: string;
}
export interface IRepository {
    slug: string;
    name: string;
    owner: string;
    private: string;
    creator: string;
    language: string;
    create_time: string;
    last_update_time: string;
}
export interface IChangingEvent {
    user: IUser;
    event: IEvent;
    repository: IRepository;
}