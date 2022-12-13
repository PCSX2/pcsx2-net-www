# Component Documentation

Below is documentation on the Components we've written to simplify writing content. You can find the code for these in `./src/mdx/`

You should also look into what Docusaurus provides out of the box, such as:

- Admonitions - https://docusaurus.io/docs/markdown-features/admonitions
- Tabs - https://docusaurus.io/docs/markdown-features/tabs

If you use VSCode, the repo comes with snippets for the Components to make writing articles hopefully that much more easier

> Arguments in bold are required

## Text

### `<TextGradient>`

If you want to make some text have a more interesting gradient color you can use this component.

**args**

- **startColor**
- **endColor**

```html
<TextGradient startColor="#7828C8" endColor="#FF4ECD"
  >Core Improvements</TextGradient
>
```

## Links

### `<PCSX2PRLink>`

This is primarily used in the progress reports to reference authors, pull requests and commits for a particular change.

**args**

- `prNums` : _string_ - Comma seperated list of the PR numbers (on the PCSX2 repo)
- `shas` : _string_ - Comma seperated list of the FULL commit SHAs (on the PCSX2 repo)
- **`authors`** : _string_ - Comma seperated list of github usernames

```html
<PCSX2PRLink
  authors="some-github-username,another-one"
  prNums="123,456"
  shas="sha1,sha2"
>
  Title of Change
</PCSX2PRLink>
```

## Images

### `<Image>`

A lazy-loaded image with configurable sizing. On mobile (or smaller displays) it will use the full width

**args**

- **`src`** : _string_ - Path to the image
- **`cols`** : _number 1 to 12 inclusive_ - The column width on non-mobile layouts
- **`alt`**: _string_ - Alt text for the image, defaults to an empty string

```html
<Image src={require("./img/image.webp").default} />
```

### `<ImageCompare>`

Two lazy-loaded images, side-by-side for comparing.

**args**

- **`left`** : _string_ - Path to the left image
- **`right`** : _string_ - Path to the right image
- `altLeft` : _string_ - Alt label for the left image
- `altRight` : _string_ - Alt label for the right image

```html
<ImageCompare left={require("./img/image-1.webp").default}
right={require("./img/image-2.webp").default} />
```

### `<SliderCompare>`

For comparing two stacked images/videos with a dividing slider

**args**

- **`before`** : _string_ - Path to the "before" image (left)
- **`after`** : _string_ - Path to the "after" image (right)

```html
<SliderCompare before={require("./img/image-1.webp").default}
after={require("./img/image-2.webp").default} />
```

## Charts

Charts use https://recharts.org/en-US under the hood

Chart data is provided using a `YAML` file, with a particular schema

### `<BarChart>`

```html
<BarChart chartDataUrl={require("./charts/Chart1-4906.yaml").default} />
```

```yaml
data:
  - name: Sly 3
    "Before (2080 Ti)": 63
    "After (2080 Ti)": 77
  - name: NFS Most Wanted
    "Before (2080 Ti)": 126
    "After (2080 Ti)": 143
  - name: Metal Gear Solid 3
    "Before (2080 Ti)": 93
    "After (2080 Ti)": 107
  - name: World Rally Championship
    "Before (2080 Ti)": 75
    "After (2080 Ti)": 82
barOptions:
  "Before (2080 Ti)":
    fillColor: "rgb(106, 156, 255)"
  "After (2080 Ti)":
    fillColor: "rgb(200, 45, 69)"
axis:
  x:
    dataKey: name
  y:
    label: "Frames Per Seconds (VPS)"
```
