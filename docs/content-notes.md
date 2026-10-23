# Content and source notes

The supplied manuscript is the source for the title, authors, affiliations, abstract, method, figures, experimental results, and numerical tables. Its original PDF is retained at `local/inputs/paper/13_A_Universal_World_Model_Lea (1).pdf`; the published copy is `assets/documents/paper.pdf`.

## Homepage highlights

- **>200 h — In-the-wild video data:** the project owner's requested lower-bound presentation. The context link points to [Ego4D](https://ego4d-data.org/), whose original source dataset is described as 3,670 hours. The headline does not claim a combined duration for Ego4D and Something-Something-v2, a measured duration of the exact training subset, or a training runtime.
- **≈1.7 min — Robotic data for adaptation:** 2,000 consecutive frame-pair transitions at the project owner's stated 20 Hz collection rate correspond to 100 seconds, or 1.67 minutes. The frame-pair count comes from the paper's qualitative domain-adaptation result.
- **0 labels — Action-free pretraining:** latent actions are learned from videos without ground-truth action labels during pretraining.

The individual-example explorer reproduces all ten Figure 3 examples and their Table 1 LPIPS values. The example crops and full paper figures are static research results.

## Author-provided links and citation

- Hanchen Cui: <https://morning-star-7.github.io/>
- Yang Gao: <https://yang-gao.weebly.com/>
- Code: <https://github.com/morning-star-7/Latent-action-world-models>
- Poster: `assets/documents/poster.png`, copied from the provided original.

The displayed and copied BibTeX entry is the author's supplied citation:

```bibtex
@inproceedings{cui2023universal,
  title={A universal world model learned from large scale and diverse videos},
  author={Cui, Hanchen and Gao, Yang},
  booktitle={NeurIPS 2023 Foundation Models for Decision Making Workshop},
  year={2023}
}
```

## Visual references

The layout draws on [DreamSteer](https://dream-steer.github.io/) and the local `~/projects/PILOT_website` project. The footer credits DreamSteer as requested. The globe icon originates from the user's supplied image; asset preparation is documented in `assets/README.md` and the local input records.
