export interface GitLabEvent {
  object_kind: string;
  event_type?: string;
  [key: string]: any;
}

export interface PushEvent extends GitLabEvent {
  object_kind: 'push';
  project_id: number;
  project_name: string;
  project_url: string;
  user_name: string;
  user_email: string;
  ref: string;
  commits: Array<{
    id: string;
    message: string;
    url: string;
    timestamp: string;
    author: {
      name: string;
      email: string;
    };
  }>;
  event_time: string;
}

export interface MergeRequestEvent extends GitLabEvent {
  object_kind: 'merge_request';
  user: {
    name: string;
    username: string;
  };
  project: {
    id: number;
    name: string;
    web_url: string;
  };
  object_attributes: {
    id: number;
    title: string;
    description: string;
    state: string;
    created_at: string;
    updated_at: string;
    source_branch: string;
    target_branch: string;
    url: string;
  };
  action: string;
}

export interface IssueEvent extends GitLabEvent {
  object_kind: 'issue';
  user: {
    name: string;
    username: string;
  };
  project: {
    id: number;
    name: string;
    web_url: string;
  };
  object_attributes: {
    id: number;
    title: string;
    description: string;
    state: string;
    created_at: string;
    updated_at: string;
    url: string;
  };
  assignees?: Array<{
    name: string;
    username: string;
  }>;
  labels?: Array<{
    id: number;
    title: string;
    color: string;
  }>;
  action: string;
}

export interface PipelineEvent extends GitLabEvent {
  object_kind: 'pipeline';
  object_attributes: {
    id: number;
    ref: string;
    status: string;
    created_at: string;
  };
  user: {
    name: string;
    username: string;
  };
  project: {
    id: number;
    name: string;
    web_url: string;
  };
  commit?: {
    id: string;
    message: string;
  };
}

export interface CommentEvent extends GitLabEvent {
  object_kind: 'note';
  user: {
    name: string;
    username: string;
  };
  project: {
    id: number;
    name: string;
    web_url: string;
  };
  object_attributes: {
    id: number;
    note: string;
    created_at: string;
    url: string;
  };
  merge_request?: {
    id: number;
    title: string;
  };
  issue?: {
    id: number;
    title: string;
  };
  commit?: {
    id: string;
  };
  snippet?: {
    id: number;
    title: string;
  };
}

export interface ReleaseEvent extends GitLabEvent {
  object_kind: 'release';
  project: {
    id: number;
    name: string;
    web_url: string;
  };
  user: {
    name: string;
    username: string;
  };
  commit: {
    id: string;
    author: {
      name: string;
    };
  };
  tag: string;
  name: string;
  description?: string;
  created_at: string;
  released_at: string;
  assets: {
    count: number;
    links: Array<{
      name: string;
      url: string;
    }>;
  };
} 