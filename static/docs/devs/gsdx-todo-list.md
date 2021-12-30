# A collection of ideas to improve GSdx OpenGL

The list is already too long! Various items require investigation. There are several potential bad ideas.

---

Uniform improvement (AKA Constant Buffer)
- [ ] Merge all VS/FS cb into a single buffer
- [ ] Move TextureScale uniform from VS to FS CB
- [ ] Replace vs_cb.Vertex_Scale_Offset by a glUniform call
- [ ] Or merge vs_cb into fs_cb (reduces binds, but increases the size of the uniform buffer slightly)
- [ ] Investigate the packing of FS uniform. Cost extra multiplication on shader, but can help to use other APIs possibility (glUniform, pre compute WH). Low priority.
* Fog Color
* Aref
* Fbmask?
* TA
* Af?

---

Texture upload improvement:
- [ ] Create a dedicated path for palette (create/upload)
* Allow to use 1D texture (save 2/8(LTF) move instructions in shader)
* PBO is probably not efficient for a small size
- [ ] Create a pool of palette texture to avoid driver synchronization
- [ ] Or uses a big texture buffer (in conjunction of TexBufferRange)

---

Texturing improvement:
- [ ] Absolute coordinate
* WMS/WMT >= 2 | all?
* TexelFetch vs Renormalization?
- [ ] clamp(x, 0, 1) is free on shader, so we could use 2 textures sampler (linear/nearest)
- [ ] Interpolation factor (upscaling context)

---

Texture Cache improvement:
- [x] Handling of AEM
- [ ] Bypass texture lookup for Read-Write RT effect
- [ ] Improve mimpap support
- [ ] Support area notion instead, to rely only on the start block address
- [x] Detect 8 bits shuffling (1 page and @RT == @TEX). Note: It seems pages are consecutive, try to do it in one pass (save 100 draw call by effect).

---

Depth effect improvement:
- [x] Conversion of 16 bits depth into 16 bits color
- [x] Allow to read back depth from GPU to EE memory
- [x] Allow to sample Depth from TFX shader rather than to do a preliminary conversion

---

Anti-aliasing
- [ ] Remove custom resolution
- [ ] MSAA vs adaptive MSAA/SSAA vs full SSAA (upscaling)

---

GLSL4 improvement
- [ ] Mix between integer => GL_EXT_shader_integer_mix
- [ ] Bit field operation (bfe/bfi) => GL_ARB_gpu_shader5
- [x] Output both uv & st from the VS (to reduce shader permutation)
- [ ] Unscale point in GS (avoid scaling issue with point rendering)

---

General architecture
- [ ] GL3 / GL4 separation?
- [ ] Global variable for s_n (greatly help debug)
- [ ] GLES3.2 investigation status (might worth to wait Mesa)?

---

Future
- [ ] ARB_shader_stencil_export to support accurate DATE
- [ ] ARB_fragment_shader_interlock to support accurate DATE/blending?
