# Shortcode Documentation

Below is documentation on the shortcodes we've written to simplify writing content.

If you'd like to learn about shortcodes more indepth, or learn how to make your own, see the following - https://gohugo.io/content-management/shortcodes/

If you use VSCode, the repo comes with snippets for the shortcodes to make writing articles hopefully that much more easier

Arguments in bold are required

- [img-cmp-slider](#img-cmp-slider)
- [img-cmp](#img-cmp)
- [img](#img)
- [imgproc](#imgproc)
- [github-link](#github-link)

## img-cmp-slider

**Usage**

Comparing two images with a mouse-activated slider.  Both images are labelled as either being the "before" or "after" image.  Images are setup to lazy-load for you.

**args**

- **`before`** : _string_ - Path to the "before" image (left)
- **`after`** : _string_ - Path to the "after" image (right)
- `full-width` : _any_ - If set in anyway the comparison will take up the full 12 column width, else 6 column is preferred

**Examples**

```html
{{< img-cmp-slider before="./img/cnr_before_s.webp" after="./img/cnr_after_s.webp">}}

{{< img-cmp-slider before="./img/old.webp" after="./img/new.webp" full-width="true">}}
```

## img-cmp

**Usage**

Comparing two images side-by-side.  Both images will take up half of the full 12 column width (6 columns each).  Images are setup to lazy-load for you.

**args**

- **`before`** : _string_ - Path to the "before" image (left)
- **`after`** : _string_ - Path to the "after" image (right)

**Examples**

```html
{{< img-cmp before="./img/cnr_before_s.webp" after="./img/cnr_after_s.webp">}}
```

## img

**Usage**

Used for displaying an image where you have control over the width, on mobile it will take up the full 12 column width however. Images are setup to lazy-load for you.

**args**

- **`src`** : _string_ - Path to the image
- **`cols`** : _number 1 to 12 inclusive_ - The column width on non-mobile layouts

**Examples**

```html
{{< img src="./img/cnr_before_s.webp" cols=6 >}}
```

## imgproc

TODO

## github-link

**Usage**

All in one shortcode used heavily for progress reports.  This handles linking to PR(s) or Commit(s) or both, with a list of authors.

**args**

Providing atleast 1 PR or Commit, and 1 Author is the intended usage.

- `prNums` : _string_ - Comma seperated list of the PR numbers (on the PCSX2 repo)
- `shas` : _string_ - Comma seperated list of the FULL commit SHAs (on the PCSX2 repo)
- **`authors`** : _string_ - Comma seperated list of github usernames
- **`title`**: _string_ - Title for the progress report entry

**Examples**

```html
{{< progress/github-link prNums="4059" title="Generate unique MAC for TAP" authors="TheLastRar" >}}

{{< progress/github-link prNums="4057,4085" shas="f1e44bfd47e3761388ebb5cc8ca4db78bb24916c" title="SPU2: Improve DMA/IRQ timing" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4314,4045" title="Add CHD compression format support" authors="rtissera,SleepyMan,siddhartha77" >}}
```
