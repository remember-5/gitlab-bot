/**
 * GitLab Tag Push事件测试用例
 */
module.exports = {
  headers:{
    "Content-Type": "application/json",
    "User-Agent": "GitLab/17.11.1-ee",
    "Idempotency-Key": "9db5a20d-3bbb-416d-a265-c095052a9348",
    "X-Gitlab-Event": "Tag Push Hook",
    "X-Gitlab-Webhook-UUID": "c764a944-82c2-4044-9213-ec5b89d12778",
    "X-Gitlab-Instance": "https://hellogitlab.top",
    "X-Gitlab-Event-UUID": "0f490e30-2db8-4091-91a1-52fe67960342"
  },
  body: {
    "object_kind": "tag_push",
    "event_name": "tag_push",
    "before": "0000000000000000000000000000000000000000",
    "after": "82b3d5ae55f7080f1e6022629cdb57bfae7cccc7",
    "ref": "refs/tags/v1.0.0",
    "ref_protected": true,
    "checkout_sha": "82b3d5ae55f7080f1e6022629cdb57bfae7cccc7",
    "user_id": 1,
    "user_name": "John Smith",
    "user_avatar": "https://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=8://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=80",
    "project_id": 1,
    "project":{
      "id": 1,
      "name":"Example",
      "description":"",
      "web_url":"http://example.com/jsmith/example",
      "avatar_url":null,
      "git_ssh_url":"git@example.com:jsmith/example.git",
      "git_http_url":"http://example.com/jsmith/example.git",
      "namespace":"Jsmith",
      "visibility_level":0,
      "path_with_namespace":"jsmith/example",
      "default_branch":"master",
      "homepage":"http://example.com/jsmith/example",
      "url":"git@example.com:jsmith/example.git",
      "ssh_url":"git@example.com:jsmith/example.git",
      "http_url":"http://example.com/jsmith/example.git"
    },
    "repository":{
      "name": "Example",
      "url": "ssh://git@example.com/jsmith/example.git",
      "description": "",
      "homepage": "http://example.com/jsmith/example",
      "git_http_url":"http://example.com/jsmith/example.git",
      "git_ssh_url":"git@example.com:jsmith/example.git",
      "visibility_level":0
    },
    "commits": [],
    "total_commits_count": 0
  }
}
