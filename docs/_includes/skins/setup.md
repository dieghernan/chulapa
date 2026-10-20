## Use this skin

In `_config.yml`, set `skin` inside your existing `chulapa-skin` section. Keep
any other settings, including your `vars` overrides:

```yaml
chulapa-skin:
  skin: {% if page.skin == 'navi_current' %}navi{% else %}{{ page.skin }}{% endif %}
```

Restart your local preview after changing `_config.yml`.

## Customize and check

Your existing `vars` overrides still apply. [Autothemer]({{ "/docs/27-autothemer" | relative_url }})
fills undefined colors only. See the [color guide]({{ "/docs/03-theming" | relative_url }})
for more appearance settings.

Check text, links, buttons and keyboard focus against the actual backgrounds on
your site, including hover, active and disabled states. A skin preview does not
guarantee accessible contrast for every component or your custom colors.
