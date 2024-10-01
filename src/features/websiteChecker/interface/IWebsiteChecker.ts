export interface SiteStatus {
    site: string;
    status: 'up' | 'down' | 'error';
    statusCode?: number;
    message?: string;
}

export interface ISite {
    url: string;
}
