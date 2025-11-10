Icon database: https://www.svgrepo.com/svg/447165/github-outline

***

Note that the `layouts/_default/baseof.html` needs to be changed. 

```html
{{ $social_params := slice "github" "discord" "youtube" "twitter" "bluesky" "instagram" "rss" }}
```

Then the `hugo.toml` can be changed.

```toml
[params]
  [params.social]
    github = "orgs/kagenti/repositories"
    discord = "invite/4SHAQ3Hgm4"
    youtube = "@Kagenti"
```