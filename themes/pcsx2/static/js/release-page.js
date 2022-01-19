import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
const octokit = new Octokit();

// NOTE - Depends on asset naming convention:
// <os>-<arch>-<additional tags>.whatever
// In the case of macOS:
// macOS-<macOS version (ie. Mojave)>-<additional tags>.whatever
// In the case of linux:
// linux-<distro OR appimage>-<arch>-<additional tags>.whatever
//
// On the surface this appears fragile, in a way it is
// but one must also remember that we should not be adding the assets manually to the releases
// Github Actions can do that for us, consistently.

// TODO - no error detection
function generateReleaseData(release) {
  let windowsArtifacts = []
  let linuxArtifacts = []
  let macOSArtifacts = []
  for (var i = 0; i < release.assets.length; i++) {
    let asset = release.assets[i];
    let assetComponents = asset.name.split(".")[0].split("-");
    if (assetComponents[0].toLowerCase() == "windows") {
      let name = assetComponents[1]
      if (assetComponents.slice(2).length > 0) {
        name += `-${assetComponents.slice(2).join('-')}`
      }
      windowsArtifacts.push({
        name: name,
        link: asset.browser_download_url
      })
    } else if (assetComponents[0].toLowerCase() == "linux") {
      let name = assetComponents[1]
      if (assetComponents.slice(2).length > 0) {
        name += `-${assetComponents.slice(2).join('-')}`
      }
      linuxArtifacts.push({
        name: name,
        link: asset.browser_download_url
      })
    } else if (assetComponents[0].toLowerCase() == "macos") {
      let name = assetComponents[1]
      if (assetComponents.slice(2).length > 0) {
        name += `-${assetComponents.slice(2).join('-')}`
      }
      macOSArtifacts.push({
        name: name,
        link: asset.browser_download_url
      });
    }
  }
  return {
    windows: { artifacts: windowsArtifacts, icon: "fab fa-windows", name: "Windows" },
    macos: { artifacts: macOSArtifacts, icon: "fab fa-apple", name: "MacOS" },
    linux: { artifacts: linuxArtifacts, icon: "fab fa-linux", name: "Linux" }
  };
}

let latestArtifactDropdown = doT.template(`<div class="col d-flex justify-content-center"><div class="dropdown"><button class="btn btn-primary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false" {{? !it.artifacts.length }}disabled{{?}}><i class="{{= it.icon }}"></i>&nbsp{{= it.name }}</button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">{{~ it.artifacts :a }}<li><a class="dropdown-item" href="{{=a.link}}">{{=a.name}}</a></li>{{~}}</ul></div></div>`)

// TODO - handle empty release notes
// TODO - theres a bug here! make the ids unique for the dropdowns
let releaseRow = doT.template(`<div class="row release-row"><div class="row release-row-details"><div class="col-md-auto release-tag">{{= it.releaseName }}</div><div class="col-md-auto flex-fill release-date">{{= it.releaseDate }}</div><div class="col-md-auto d-flex justify-content-end release-artifacts">{{~ it.platforms :platform }}{{? platform.artifacts.length }}<a role="button" id="language-dropdown" data-mdb-toggle="dropdown" data-mdb-ripple-duration="none"><i class="{{= platform.icon }} release-artifact-icon"></i></a><ul class="dropdown-menu" id="language-dropdown-list">{{~ platform.artifacts :artifact }}<li><a class="dropdown-item" href="{{= artifact.link }}">{{= artifact.name }}</a></li>{{~}}</ul>{{?}}{{~}}</div><div class="col-md-auto d-flex justify-content-end align-items-center release-notes-toggle-container"><a role="button" class="release-notes-toggle">Release Notes</a></div></div><div class="row release-notes mt-2"><div class="col-12">{{= it.releaseNotes }}</div></div></div>`);

let emptyPreviousReleases = doT.template(`<div class="row"><div class="col release-no-previous-text"><h5>There are no previous releases to display</h5></div></div>`);

let viewMoreReleases = doT.template(`<div class="row mt-3"><div class="button d-flex justify-content-center"><a role="button" class="btn btn-outline-info" id="{{= it.domId }}">View More</a></div></div>`)

let nightlies = [];
let prevStables = [];

let numPagesPrevStable = 1;
let numPagesPrevNightlies = 1;

function renderPrevReleases() {
  $('#previous-stable-releases').html('');
  $('#previous-nightly-builds').html('');

  if (prevStables.length <= 0) {
    $('#previous-stable-releases').append(emptyPreviousReleases());
  }
  let maxItems = numPagesPrevStable * 5;
  for (var i = 0; i < maxItems && i < prevStables.length; i++) {
    let artifactData = generateReleaseData(prevStables[i]);
    let templateData = {
      releaseName: prevStables[i].name,
      releaseDate: new Date(prevStables[i].published_at).toLocaleDateString(),
      platforms: [artifactData.windows, artifactData.linux, artifactData.macos],
      releaseNotes: marked(prevStables[i].body)
    }
    $('#previous-stable-releases').append(releaseRow(templateData));
  }
  if (prevStables.length > maxItems) {
    $('#previous-stable-releases').append(viewMoreReleases({ domId: "view-more-stable"}));
  }

  $('#latest-nightly-ver').html(nightlies[0].name);
  $('#latest-nightly-notes').html(marked(nightlies[0].body));
  let latestNightlyArtifactData = generateReleaseData(nightlies[0]);
  $('#latest-nightly-artifacts').append(
    latestArtifactDropdown(latestNightlyArtifactData.windows) +
    latestArtifactDropdown(latestNightlyArtifactData.linux) +
    latestArtifactDropdown(latestNightlyArtifactData.macos)
  );

  if (nightlies.length <= 1) {
    $('#previous-nightly-builds').append(emptyPreviousReleases());
  }
  maxItems = (numPagesPrevNightlies * 5) + 1;
  // TODO - don't be an idiot, refactor and slice off the latest nightly instead of these hacks
  for (var i = 1; i < maxItems && i < nightlies.length; i++) {
    let artifactData = generateReleaseData(nightlies[i]);
    let templateData = {
      releaseName: nightlies[i].name,
      releaseDate: new Date(nightlies[i].published_at).toLocaleDateString(),
      platforms: [artifactData.windows, artifactData.linux, artifactData.macos],
      releaseNotes: marked(nightlies[i].body)
    }
    $('#previous-nightly-builds').append(releaseRow(templateData));
  }
  if (nightlies.length > maxItems) {
    $('#previous-nightly-builds').append(viewMoreReleases({ domId: "view-more-nightlies"}));
  }

  // Event Handlers
  $(".release-notes-toggle").click(function (elem) {
    $(elem.target).parent().parent().parent().find('.release-notes').first().toggle();
  });
  $("#view-more-nightlies").click(function () {
    if (numPagesPrevNightlies * 5 < nightlies.length) {
      numPagesPrevNightlies++;
    }
    renderPrevReleases();
  });
  $("#view-more-stable").click(function () {
    if (numPagesPrevStable * 5 < prevStables.length) {
      numPagesPrevStable++;
    }
    renderPrevReleases();
  });
}

$('document').ready(async function () {
  // Get the latest release
  const { data: latestRelease } = await octokit.rest.repos.getLatestRelease({
    owner: "PCSX2",
    repo: "pcsx2",
  });
  $('#latest-stable-ver').html(latestRelease.tag_name);
  $('#latest-stable-notes').html(marked(latestRelease.body));
  let latestStableArtifactData = generateReleaseData(latestRelease);
  $('#latest-release-artifacts').append(
    latestArtifactDropdown(latestStableArtifactData.windows) +
    latestArtifactDropdown(latestStableArtifactData.linux) +
    latestArtifactDropdown(latestStableArtifactData.macos)
  );

  // Older Releases and Nightly Releases
  // TODO - for now just paginate and get all the releases
  // - in the long-term we'll want to switch this to a backend cached API
  //   - this is because Github's API does not allow for granular filtering, even with graphQL
  const { data: allReleasesTest } = await octokit.rest.repos.listReleases({
    owner: "xTVaser", // TODO - change to the actual pcsx2 repo later, im using my fork for demo purposes cause it has a decent number of releases
    repo: "pcsx2-rr",
    per_page: 100
  });
  // We only care about releases marked as "pre-release", this is likely the best signifier we can use
  // on github releases, in addition to some sort of naming scheme.
  // Releases are by default sorted by their published date NOT the created date (which corresponds to the tag its associated with)
  for (var i = 0; i < allReleasesTest.length; i++) {
    let release = allReleasesTest[i];
    if (release.prerelease) {
      nightlies.push(release);
    } else if (release.id != latestRelease.id) {
      prevStables.push(release);
    }
  }

  renderPrevReleases();

  // Test Releases

  // The following GraphQL query gives all open PRs that are passing CI, we can then filter out the ones that are passing and display them
  /**
  
  
  
  {
    "owner": "PCSX2",
    "repo": "pcsx2",
    "states": "OPEN",
    "baseRefName": "master",
    "perPage": 100,
    "endCursor": "Y3Vyc29yOnYyOpK5MjAyMS0wNi0wMlQxNzowMDowOS0wNDowMM4nXLea"
  }
   */
});
