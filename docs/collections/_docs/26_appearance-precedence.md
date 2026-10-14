---
title: How skins and overrides interact
subtitle: Understand which appearance settings take effect
---

A skin provides a coordinated starting design. Individual variables customize
that design; Autothemer supplies a generated palette for values that are still
undefined. These choices affect appearance rather than the content layout.

## Why a color change can leave other colors unchanged

The selected skin supplies variable assignments first. Values in
`chulapa-skin.vars` override those assignments. Autothemer follows, using defaults
that preserve values already assigned by either source. Bootstrap and the theme's
components then use those values to produce the stylesheet.

That is why changing `primary` does not promise a complete recoloring of an
existing skin. If it explicitly assigns a warning color or navbar background,
that component can retain its own color. Autothemer fills gaps; it does not
replace an existing palette. A skin written with `!default` allows subsequent
configuration overrides while cooperating with the default palette.

Without an explicit skin/variable value, the navbar background uses `primary`;
the footer and hero inherit the navbar background, and the landing page inherits
the hero background. Many text colors are derived from backgrounds. Explicit
component values take precedence over these defaults.

## Variables and custom CSS serve different needs

A supported variable controls a design value used by the theme. Some helper
values are calculated, including `landingpage-card-bg` and `cactus-btn-text`;
they are not independent configuration inputs. Custom CSS is useful for rules
that have no exposed variable. It loads after the theme stylesheet, although
CSS specificity and individual rules still determine which declaration wins.

A local copy of a matching theme layout, include or asset takes precedence over
the installed theme file. That can preserve a customization through an upgrade,
but also keep an old implementation. A theme update does not automatically merge
those copies. The same maintenance trade-off applies to a custom skin.

## Choosing the right scope of change

A predefined skin suits a whole-site design choice. A variable override suits
one color, font or component. A generated palette suits undefined colors that
should relate to `primary`. A custom Sass skin suits a reusable set of assignments
or rules; it carries more maintenance responsibility than a few config overrides.

For procedures, use [Choose a skin](./22-choose-skin), [Change a color](./23-change-color),
[Change fonts](./24-change-fonts), [Enable Autothemer](./27-autothemer) or
[Adapt a Sass skin](./28-custom-skin). The [appearance reference](./03-theming)
and [variable dictionary](./variable-dictionary) describe the inputs.
