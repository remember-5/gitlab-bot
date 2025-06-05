// Release Hook
export default {
  headers:{
    "Content-Type": "application/json",
    "User-Agent": "GitLab/17.11.1-ee",
    "Idempotency-Key": "9db5a20d-3bbb-416d-a265-c095052a9348",
    "X-Gitlab-Event": "Merge Request Hook",
    "X-Gitlab-Webhook-UUID": "c764a944-82c2-4044-9213-ec5b89d12778",
    "X-Gitlab-Instance": "https://hellogitlab.top",
    "X-Gitlab-Event-UUID": "0f490e30-2db8-4091-91a1-52fe67960342"
  },
  request: {
    "object_kind": "merge_request",
    "event_type": "merge_request",
    "user": {
      "id": 223,
      "name": "王加豪",
      "username": "王加豪",
      "avatar_url": "https://secure.gravatar.com/avatar/dd38479a3e07367d7d685548565599be3021bc904bedcf75076bdd9ee86f7fce?s=80&d=identicon",
      "email": "[REDACTED]"
    },
    "project": {
      "id": 482,
      "name": "ruoyi-vue-plus",
      "description": null,
      "web_url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus",
      "avatar_url": null,
      "git_ssh_url": "git@hellogitlab.top:ryf/java/ruoyi-vue-plus.git",
      "git_http_url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus.git",
      "namespace": "java",
      "visibility_level": 0,
      "path_with_namespace": "ryf/java/ruoyi-vue-plus",
      "default_branch": "main",
      "ci_config_path": "",
      "homepage": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus",
      "url": "git@hellogitlab.top:ryf/java/ruoyi-vue-plus.git",
      "ssh_url": "git@hellogitlab.top:ryf/java/ruoyi-vue-plus.git",
      "http_url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus.git"
    },
    "object_attributes": {
      "assignee_id": 9,
      "author_id": 223,
      "created_at": "2025-06-05 15:04:15 +0800",
      "description": "fix: b端人脸认证\n\nb端人脸认证\n\nChangelog: fix",
      "draft": false,
      "head_pipeline_id": 19425,
      "id": 4979,
      "iid": 607,
      "last_edited_at": null,
      "last_edited_by_id": null,
      "merge_commit_sha": null,
      "merge_error": null,
      "merge_params": {
        "force_remove_source_branch": "1"
      },
      "merge_status": "unchecked",
      "merge_user_id": null,
      "merge_when_pipeline_succeeds": false,
      "milestone_id": null,
      "source_branch": "feat/b-er-code",
      "source_project_id": 482,
      "state_id": 1,
      "target_branch": "test",
      "target_project_id": 482,
      "time_estimate": 0,
      "title": "fix: b端人脸认证",
      "updated_at": "2025-06-05 15:48:01 +0800",
      "updated_by_id": null,
      "prepared_at": "2025-06-05 15:04:22 +0800",
      "assignee_ids": [
        9
      ],
      "blocking_discussions_resolved": true,
      "detailed_merge_status": "unchecked",
      "first_contribution": false,
      "human_time_change": null,
      "human_time_estimate": null,
      "human_total_time_spent": null,
      "labels": [],
      "last_commit": {
        "id": "eee7db80b395994106c2f2e070c7a3dc2cce0c87",
        "message": "fix: b端人脸认证,修改建议\n\nb端人脸认证,修改建议\n\nChangelog: fix\n",
        "title": "fix: b端人脸认证,修改建议",
        "timestamp": "2025-06-05T15:47:36+08:00",
        "url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus/-/commit/eee7db80b395994106c2f2e070c7a3dc2cce0c87",
        "author": {
          "name": "陈海明",
          "email": "[REDACTED]"
        }
      },
      "reviewer_ids": [],
      "source": {
        "id": 482,
        "name": "ruoyi-vue-plus",
        "description": null,
        "web_url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus",
        "avatar_url": null,
        "git_ssh_url": "git@hellogitlab.top:ryf/java/ruoyi-vue-plus.git",
        "git_http_url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus.git",
        "namespace": "java",
        "visibility_level": 0,
        "path_with_namespace": "ryf/java/ruoyi-vue-plus",
        "default_branch": "main",
        "ci_config_path": "",
        "homepage": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus",
        "url": "git@hellogitlab.top:ryf/java/ruoyi-vue-plus.git",
        "ssh_url": "git@hellogitlab.top:ryf/java/ruoyi-vue-plus.git",
        "http_url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus.git"
      },
      "state": "opened",
      "target": {
        "id": 482,
        "name": "ruoyi-vue-plus",
        "description": null,
        "web_url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus",
        "avatar_url": null,
        "git_ssh_url": "git@hellogitlab.top:ryf/java/ruoyi-vue-plus.git",
        "git_http_url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus.git",
        "namespace": "java",
        "visibility_level": 0,
        "path_with_namespace": "ryf/java/ruoyi-vue-plus",
        "default_branch": "main",
        "ci_config_path": "",
        "homepage": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus",
        "url": "git@hellogitlab.top:ryf/java/ruoyi-vue-plus.git",
        "ssh_url": "git@hellogitlab.top:ryf/java/ruoyi-vue-plus.git",
        "http_url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus.git"
      },
      "time_change": 0,
      "total_time_spent": 0,
      "url": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus/-/merge_requests/607",
      "work_in_progress": false,
      "approval_rules": [
        {
          "id": 1102,
          "approvals_required": 0,
          "name": "All Members",
          "rule_type": "any_approver",
          "report_type": null,
          "merge_request_id": 4979,
          "section": null,
          "modified_from_project_rule": false,
          "orchestration_policy_idx": null,
          "vulnerabilities_allowed": 0,
          "scanners": [],
          "severity_levels": [],
          "vulnerability_states": [
            "new_needs_triage",
            "new_dismissed"
          ],
          "security_orchestration_policy_configuration_id": null,
          "scan_result_policy_id": null,
          "applicable_post_merge": null,
          "project_id": 482,
          "approval_policy_rule_id": null,
          "updated_at": "2025-06-05 15:04:15 +0800",
          "created_at": "2025-06-05 15:04:15 +0800"
        },
        {
          "id": 1103,
          "approvals_required": 1,
          "name": "测试分支合并",
          "rule_type": "regular",
          "report_type": null,
          "merge_request_id": 4979,
          "section": null,
          "modified_from_project_rule": false,
          "orchestration_policy_idx": null,
          "vulnerabilities_allowed": 0,
          "scanners": [],
          "severity_levels": [],
          "vulnerability_states": [
            "new_needs_triage",
            "new_dismissed"
          ],
          "security_orchestration_policy_configuration_id": null,
          "scan_result_policy_id": null,
          "applicable_post_merge": null,
          "project_id": 482,
          "approval_policy_rule_id": null,
          "updated_at": "2025-06-05 15:04:15 +0800",
          "created_at": "2025-06-05 15:04:15 +0800"
        },
        {
          "id": 1104,
          "approvals_required": 1,
          "name": "生产分支合并",
          "rule_type": "regular",
          "report_type": null,
          "merge_request_id": 4979,
          "section": null,
          "modified_from_project_rule": false,
          "orchestration_policy_idx": null,
          "vulnerabilities_allowed": 0,
          "scanners": [],
          "severity_levels": [],
          "vulnerability_states": [
            "new_needs_triage",
            "new_dismissed"
          ],
          "security_orchestration_policy_configuration_id": null,
          "scan_result_policy_id": null,
          "applicable_post_merge": null,
          "project_id": 482,
          "approval_policy_rule_id": null,
          "updated_at": "2025-06-05 15:04:15 +0800",
          "created_at": "2025-06-05 15:04:15 +0800"
        }
      ],
      "action": "update",
      "oldrev": "3b3e2fc6098099532eb4192e1f1756546be2296e"
    },
    "labels": [],
    "changes": {},
    "repository": {
      "name": "ruoyi-vue-plus",
      "url": "git@hellogitlab.top:ryf/java/ruoyi-vue-plus.git",
      "description": null,
      "homepage": "https://hellogitlab.top/ryf/java/ruoyi-vue-plus"
    },
    "assignees": [
      {
        "id": 9,
        "name": "王家豪",
        "username": "wangjiahao",
        "avatar_url": "https://hellogitlab.top/uploads/-/system/user/avatar/9/avatar.png",
        "email": "[REDACTED]"
      }
    ]
  }
}
