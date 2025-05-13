---
title: "Advanced Code Formatting Guidelines"
summary: "PCSX2 Project Coding Guidelines"
draft: false
toc: true
sidebar_position: 3
---

Coding guidelines for the entire PCSX2 project.

:::note
This guideline is subject to change as the need arises.
:::

- [General Rules](#general-rules)
  - [Use Tabs For Indentation](#use-tabs-for-indentation)
  - [Indent Namespaces](#indent-namespaces)
  - [Indent Members](#indent-members)
  - [No Indentation For Labels](#no-indentation-for-labels)
  - [Place The Public API First](#place-the-public-api-first)
  - [Use Descriptive Names](#use-descriptive-names)
  - [Avoid Operator Overloading](#avoid-operator-overloading)
  - [Use Scoping Where Applicable](#use-scoping-where-applicable)
- [Variables](#variables)
  - [Snake Case For Variable Names](#snake-case-for-variable-names)
  - [Prefix Member Variables With `m_`](#prefix-member-variables-with-m_)
  - [Prefix Static Variables With `s_`](#prefix-static-variables-with-s_)
  - [Mark Variables `const` Where Applicable](#mark-variables-const-where-applicable)
  - [Encapsulate](#encapsulate)
  - [Prefer STL Containers Where Applicable](#prefer-stl-containers-where-applicable)
  - [Prefer `static constexpr` For Compile Time Constants](#prefer-static-constexpr-for-compile-time-constants)
- [Functions](#functions)
  - [Camel Case For Function Names](#camel-case-for-function-names)
  - [Avoid Excessive/Non-Obvious Parameter Usage](#avoid-excessivenon-obvious-parameter-usage)
  - [Mark Member Functions `const` Where Applicable](#mark-member-functions-const-where-applicable)
- [Types](#types)
  - [Capital Case For Type Names](#capital-case-for-type-names)
  - [Reference And Pointer Specifiers](#reference-and-pointer-specifiers)
  - [Use Type Aliasing Where Applicable](#use-type-aliasing-where-applicable)
  - [Namespace Enums](#namespace-enums)
  - [Use Enum Types Explcitly](#use-enum-types-explcitly)
- [Control Statements](#control-statements)
  - [Space Following The Keyword](#space-following-the-keyword)
  - [Use Spaces, Newlines And Intermediate Variables](#use-spaces-newlines-and-intermediate-variables)
  - [Braces On Seperate Lines](#braces-on-seperate-lines)
  - [Prefer Ranged For Loops](#prefer-ranged-for-loops)
- [Preprocessor](#preprocessor)
  - [Use `#pragma once`](#use-pragma-once)
- [Comments](#comments)
  - [Use `//`](#use-)
  - [Avoid The Obvious](#avoid-the-obvious)
  - [Denote And Explain All Hacks](#denote-and-explain-all-hacks)

## General Rules

### Use Tabs For Indentation

```cpp
// good
{
	int foo = 0;
}

// bad
{
    int foo = 0;
}
```

:::warning
Always use tabs (4 width) for indentation. **No exceptions**.
:::

[Visual Studio Guide](https://docs.microsoft.com/en-us/visualstudio/ide/reference/options-text-editor-c-cpp-formatting?view=vs-2019)

### Indent Namespaces

```cpp
// good
namespace Util
{
	class File
	{

	};
}


// bad
namespace Util
{
class File
{

};
}
```

### Indent Members

```cpp
// good
class Texture
{
public:
	GSVector4i getSize() const;

private:
	GSVector4i m_size;
};

// bad
class Texture
{
public:
GSVector4i getSize() const;

private:
GSVector4i m_size;
};
```

### No Indentation For Labels

```cpp
// good
class Texture
{
public:
	bool isValid() const;

private:
	bool m_valid;
};

// bad
class Texture
{
	public:
	bool isValid() const;

	private:
	bool m_valid;
};
```

### Place The Public API First

```cpp
// good
class Texture
{
public:
	bool isValid() const;
	GSVector4i getSize() const;

	void setValid();
	void setInvalid();
	void setSize(const GSVector4i& size);
private:
	bool m_valid;
	GSVector4i m_size;

	void onResize();
}

```

:::tip
Don't distract other developers with implementation details. Place the public API first where it is easy to find.
:::

### Use Descriptive Names

```cpp
// good
GSVector4i display_offset;
GSVector4i getDisplayOffset();

// bad
GSVector4i off;
GSVector4i getOffset();
```

:::tip
Always use descriptive names when declaring variables and functions.

**Do not** shorten variable names for the sake of saving a few keystrokes. Code is meant to be easily read not easily written.
:::

### Avoid Operator Overloading

```cpp
// good
auto sizer = new wxStaticBoxSizer(wxVERTICAL, this, L"Sizer");
sizer->Add(some_panel, StdExpand());

// awful
auto& sizer (*new wxStaticBoxSizer(wxVERTICAL, this, L"Sizer" ));
sizer += some_panel | StdExpand();
```

Do not make excessive use of operator overloading.

**Exception:** Some types are condusive to mathmatical operator overloading such as a simd or other wrapper type.

**Exception:** Sometimes it is acceptable to overload the assignment, move assignment or comparison operators.

### Use Scoping Where Applicable

```cpp
// good
// scope denotes a critical section
{
	std::lock_guard<std::mutex> lk(mutex);
	// ...
}

// good
// prevents a hack from polluting local scope
{
	// HACK: Nvidia cards have an alignment issue
	const bool should_offset = m_device->isNvidia() && m_hacks_enabled;
	if (should_offset)
	{

	}
}

// good
// scope helps prevent name collisions in a large function
bool CreateState()
{
	{
		D3D11_DEPTH_STENCIL_DESC depth_stencil_desc = {};
		depth_stencil_desc.DepthEnable = false;
		depth_stencil_desc.DepthWriteMask = D3D11_DEPTH_WRITE_MASK_ZERO;
		depth_stencil_desc.DepthFunc = D3D11_COMPARISON_NEVER;

		HRESULT result = E_FAIL;
		result = m_device->CreateDepthStencilState(
			&depth_stencil_desc, &m_depth_no_write
		);

		if (FAILED(result))
			return false;
	}

	{
		D3D11_DEPTH_STENCIL_DESC depth_stencil_desc = {};
		depth_stencil_desc.DepthEnable = true;
		depth_stencil_desc.DepthWriteMask = D3D11_DEPTH_WRITE_MASK_ALL;
		depth_stencil_desc.DepthFunc = D3D11_COMPARISON_ALWAYS;

		HRESULT result = E_FAIL;
		hr = m_dev->CreateDepthStencilState(
			&depth_stencil_desc, &m_depth_write
		);

		if (FAILED(result))
			return false;
	}

	return true;
}
```

## Variables

### Snake Case For Variable Names

```cpp
// good
int current_offset;

// bad
int currentOffset;
int CurrentOffset;
```

### Prefix Member Variables With `m_`

```cpp
class Texture
{
	// good
	bool m_valid;
	// bad
	GSVector4i size;
}
```

### Prefix Static Variables With `s_`

```cpp
// good
static s_device;

// bad
static device;
```

### Mark Variables `const` Where Applicable

```cpp
// good - not going to change
const bool is_valid = texture && texture->isValid();

// good - deonte function won't modify the reference
void checkSize(const GSVector4i& size);
```

### Encapsulate

```cpp
// good
auto size = texture->getSize();
if (texture->isValid())
{

}

// bad
auto size = texture->m_size;
if (texture->m_valid)
{

}
```

### Prefer STL Containers Where Applicable

```cpp
// good
std::array<int, 2> foo;
std::unique_ptr<int> bar;

// bad
int foo[2];
int* bar;
```

:::tip
**Exception:** It is a common idiom in gui toolkits such as wx to use raw pointers. In those instances you should prefer raw pointers to smart pointers.
:::

### Prefer `static constexpr` For Compile Time Constants

```cpp
// good
class Texture
{
	static constexpr MAX_BUFFER_SIZE = 1920 * 1080;
	using BufferType = std::array<uint32, MAX_BUFFER_SIZE>;

	BufferType m_data;
}

// bad
#define MAX_BUFFER_SIZE 20736000
class Texture
{
	using BufferType = std::array<uint32, MAX_BUFFER_SIZE>;
	BufferType m_data;
}

```

## Functions

### Camel Case For Function Names

```cpp
// good
GSVector4i getSize();

// bad
GSVector4i get_size();
GSVector4i GetSize();
```

All functions (global, member or otherwise) must be in camelCase form.

### Avoid Excessive/Non-Obvious Parameter Usage

```cpp
// good
TextureCache::LookupInfo lookup_info = {};
lookup_info.base = 0x0;
lookup_info.buffer_wdith = 10;
lookup_info.psm = PSM::CT32;
lookup_info.rectangle = GSVector4i(0, 0, 64, 64);

auto texture = m_texture_cache->Search(lookup_info);

// bad - not obvious
auto texture = m_texture_cache->Search(0x0, 10, PSM::CT32, 0, 0, 64, 64);
auto texture = m_texture_cache->Search({0x0, 10, PSM::CT32, 0, 0, 64, 64});
```

Avoid parameter usage which is non-obvious. Try to keep functions with in a reasonable amount of parameters. Consider the use of a `struct` in instances where this is not avoidable.

:::info
The Windows calling convention passes the first 2 arguments (4 in x64) as registers.
:::

### Mark Member Functions `const` Where Applicable

```cpp
class Texture
{
private:
	GSVector4i m_size;
	bool m_valid;
public:
	// good
	GSVector4i getSize() const
	{
		return m_size;
	}

	// bad - doesn't modify the object, use const
	bool isValid()
	{
		return m_valid;
	}
}
```

## Types

### Capital Case For Type Names

```cpp
// good
struct LookupInfo;
class CachedTexture;
enum ColorFormat;

// bad
struct lookupInfo;
class cached_texture;
enum COLOR_FORMAT;
```

### Reference And Pointer Specifiers

```cpp
// good
int& foo;
int&& foo;
int* bar_ptr;
int** ptr;

// bad
int &foo;
int &&foo;
int *bar;
int **bar;
```

:::warning
Reference and pointer specifiers follow the type name and are immediately followed by a space. **No exceptions**.
:::

### Use Type Aliasing Where Applicable

```cpp
// good
using BufferType = std::array<uint32, 1920 * 1080>;

BufferType buffer1;
BufferType buffer2;
BufferType buffer3;

// bad
std::array<uint32, 1920 * 1080> buffer1;
std::array<uint32, 1920 * 1080> buffer2;
std::array<uint32, 1920 * 1080> buffer3;
```

In addition to making the code more readable, this makes it easier to modify a shared type.

### Namespace Enums

```cpp
// good
namespace Format
{
	enum PSM
	{
		CT32 = 0x0,
		CT24 = 0x1,
		// ...
	};
}

case Format::PSM::CT32:
case Format::CT24:

// bad - pollutes the global namespace
enum PSM
{
	PSMCT32 = 0x0,
	PSMCT24 = 0x1,
	// ...
};
```

### Use Enum Types Explcitly

```cpp
namespace Color
{
	enum Format;
}

// good
void setFormat(Color::Format format);

// bad
void setFormat(int format);
```

## Control Statements

### Space Following The Keyword

```cpp
// good
if (check)
while (true)
for (const auto& item : items)

// bad
if(check)
while(true)
for(const auto& item : items)
```

### Use Spaces, Newlines And Intermediate Variables

```cpp
// good
if (some_long_variable ||
	some_other_variable &&
	some_other_long_variable)
{

}

// good
const bool check = some_long_variable ||
	some_other_variable &&
	some_other_long_variable;

if (check)
{

}

// bad
if (some_long_variable || some_other_variable && some_other_long_variable)

```

### Braces On Seperate Lines

```cpp
// good
for (const auto& item : items)
{
	// do something with item
}

// good
if (check)
{

}

// bad
if (check) {

}

// awful
if (check) { doSomething(); }
if (check) doSomething();
```

:::tip
**Exception:** In the event that the body of the control statement is one line, the braces can be omitted.
:::

```cpp
// this is acceptable
if (some_check)
	doSomething();
```

### Prefer Ranged For Loops

```cpp
// good
for (const auto& texture : cached_textures)
{
	auto size = texture->getSize();
	// ...
}

// bad
for (int i = 0; i < cached_texture.size(); i++)
{
	auto size = textures[i]->getSize();
	// ...
}
```

## Preprocessor

### Use `#pragma once`

```cpp
// good
#pragma once
class Texture
{

}

// bad - define guard
#ifndef TEXTURE
#define TEXTURE
class Texture
{

}
#endif
```

## Comments

### Use `//`

```cpp
// good
// an invalid texture here means we are recovering
// from an ealier error

// bad
/*
an invalid texture here means we are recovering
from an ealier error
*/
```

:::tip
Prefer the usage of `//` for all comments. Developers commonly need to comment an entire block of code and having a `/* */` style comment in the middle often causes problems.
:::

### Avoid The Obvious

```cpp
// good
// an invalid texture here means we are recovering
// from an earlier error
if (!texture->isValid())
{

}

// bad
// check if the texture is valid
if (!texture->isValid())
{

}
```

:::tip
Avoid comments which outright state what the code is doing. Try to make comments describe what _isn't_ obvious about the code.
:::

### Denote And Explain All Hacks

```cpp
// good
// HACK: The data cache is too slow to reasonably emulate
```
