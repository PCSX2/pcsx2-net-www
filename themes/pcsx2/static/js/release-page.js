let latestArtifactDropdown = doT.template(`
<div class="col-12 col-sm d-flex justify-content-center artifact-button">
  <div class="dropdown">
    {{? it.assets.length }}
    <button class="btn btn-primary artifact-dropdown btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false">
      <i class="{{= it.icon }}"></i>&nbsp{{= it.name }}&nbsp-&nbsp{{= it.version }}
    </button>
    {{?? true}}
    <span class="d-inline-block" tabindex="0" data-mdb-toggle="tooltip" title="No Releases Found">
      <button class="btn btn-primary artifact-dropdown btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false" style="pointer-events: none;" disabled>
        <i class="{{= it.icon }}"></i>&nbsp{{= it.name }}&nbsp-&nbsp{{= it.version }}
      </button>
    </span>
    {{?}}
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
      {{~ it.assets :a }}
      <li><a class="dropdown-item" href="{{=a.url}}">{{=a.displayName}}{{~ a.additionalTags :t }} - {{=t}}{{~}}</a></li>
      {{~}}
    </ul>
  </div>
</div>`)

let tableLoading = doT.template(`
<tr style="align-content: center;text-align: center;">
  <td colspan="{{= it.colspan}}">
    <img class="loading-logo" src="/img/pcsx2-logo.svg">
  </td>
</tr>
`)

let tableMessage = doT.template(`
<tr style="align-content: center;text-align: center;">
  <td colspan="{{= it.colspan }}">{{= it.message }}</td>
</tr>
`)

let releaseRow = doT.template(`
<tr>
  <td><a href="{{= it.url}}" target="blank">{{= it.releaseName }}</a></td>
  <td>
  {{? it.platforms.length }}
  {{~ it.platforms :platform }}
    {{? platform.assets.length }}
    <a role="button" data-mdb-toggle="dropdown" data-mdb-ripple-duration="none">
      <i class="{{= platform.icon }} release-artifact-icon"></i>
    </a>
    <ul class="dropdown-menu dropdown-menu-end">
    {{~ platform.assets :asset }}
      <li>
        <a class="dropdown-item" href="{{= asset.url }}">{{= asset.displayName }}{{~ asset.additionalTags :t }} - {{=t}}{{~}}</a>
      </li>
    {{~}}
    </ul>
    {{?? true}}
    <span class="d-inline-block" tabindex="0" data-mdb-toggle="tooltip" title="No Releases Found">
      <a role="button" data-mdb-toggle="dropdown" data-mdb-ripple-duration="none" class="disabled">
        <i class="{{= platform.icon }} release-artifact-icon"></i>
      </a>
    </span>
    {{?}}
  {{~}}
  {{?? true }}
  <em class="text-muted">None</em>
  {{?}}
  </td>
  <td>{{= it.releaseDate }}</td>
  <td>
  {{? it.releaseNotes }}
  {{= it.releaseNotes }}
  {{?? true}}
  <em class="text-muted">None</em>
  {{?}}
  </td>
</tr>`);

let pullRequestRow = doT.template(`
<tr>
  <td>{{= it.authorName }}</td>
  <td><a href="{{= it.url}}" target="blank">{{= it.title }}</a></td>
  <td>{{= it.updatedAt }}</td>
  <td>
    <i class="far fa-plus-square pr-additions"></i>&nbsp;
    <span class="pr-additions">{{= it.additions }}</span>
  </td>
  <td>
    <i class="far fa-minus-square pr-deletions"></i>&nbsp;
    <span class="pr-deletions">{{= it.deletions }}</span>
  </td>
</tr>`);

let pageButtonTemplate = doT.template(`
<div class="col-auto">
  <button type="button" class="btn btn-pagination {{=it.addClass}}" value="{{=it.val}}" {{? it.disabled }}disabled{{?}}>{{=it.val}}</button>
</div>`)

let latestRelease = undefined;
let latestNightly = undefined;
let prevStableReleases = [];
let prevNightlies = [];
let passingPRs = [];

let pageSize = 10;
let totalPrevStable = 0;
let totalPrevNightly = 0;
let totalPullRequests = 0;

let currentPagePrevStable = 0;
let currentPagePrevNightly = 0;
let currentPagePullRequests = 0;

let baseURL = location.hostname === "localhost" ? "http://localhost:3000/v1" : "https://api.pcsx2.net/v1"

$('document').ready(async function () {
  try {
    const response = await fetch(`${baseURL}/latestReleasesAndPullRequests`);
    $('.skeleton-container').hide();
    $('.skeleton-wrapper').hide();
    if (response.status == 429) {
      // rate limited
      $("#stable-table-body").html(tableMessage({
        colspan: 4,
        message: "You are Being Rate-Limited - Wait and Try Again"
      }));
      $("#nightly-table-body").html(tableMessage({
        colspan: 4,
        message: "You are Being Rate-Limited - Wait and Try Again"
      }));
      $("#pull-request-table-body").html(tableMessage({
        colspan: 5,
        message: "You are Being Rate-Limited - Wait and Try Again"
      }));
      return;
    } else if (response.status != 200) {
      // unexpected error
      $("#stable-table-body").html(tableMessage({
        colspan: 4,
        message: "Unexpected Error Occurred - Please Try Again Later"
      }));
      $("#nightly-table-body").html(tableMessage({
        colspan: 4,
        message: "Unexpected Error Occurred - Please Try Again Later"
      }));
      $("#pull-request-table-body").html(tableMessage({
        colspan: 5,
        message: "Unexpected Error Occurred - Please Try Again Later"
      }));
      $('#outage-alert').show();
      return;
    }

    const releasesAndBuilds = await response.json();

    if ('stableReleases' in releasesAndBuilds && releasesAndBuilds.stableReleases.data.length > 0) {
      latestRelease = releasesAndBuilds.stableReleases.data[0];
      $('#latest-release-notes').append(`Latest stable release notes can be found <a href="${latestRelease.url}">here</a>`);
      renderLatestRelease(latestRelease, "#latest-release-artifacts");
    }

    if ('stableReleases' in releasesAndBuilds && releasesAndBuilds.stableReleases.data.length > 1) {
      prevStableReleases = releasesAndBuilds.stableReleases.data;
      totalPrevStable = releasesAndBuilds.stableReleases.pageInfo.total;
      renderPreviousReleases("stable", true);
    }

    if ('nightlyReleases' in releasesAndBuilds && releasesAndBuilds.nightlyReleases.data.length > 0) {
      latestNightly = releasesAndBuilds.nightlyReleases.data[0];
      $('#latest-nightly-notes').append(`Latest nightly release notes can be found <a href="${latestNightly.url}">here</a>`);
      renderLatestRelease(latestNightly, "#latest-nightly-artifacts");
    }

    if ('nightlyReleases' in releasesAndBuilds && releasesAndBuilds.nightlyReleases.data.length > 1) {
      prevNightlies = releasesAndBuilds.nightlyReleases.data;
      totalPrevNightly = releasesAndBuilds.nightlyReleases.pageInfo.total;
      renderPreviousReleases("nightly", true);
    }

    if ('pullRequestBuilds' in releasesAndBuilds && releasesAndBuilds.pullRequestBuilds.data.length > 0) {
      passingPRs = releasesAndBuilds.pullRequestBuilds.data;
      totalPullRequests = releasesAndBuilds.pullRequestBuilds.pageInfo.total;
      renderPullRequests(true);
    }
  } catch (e) {
    $('#outage-alert').show();
  }
});

function renderLatestRelease(latestRelease, selector) {
  if (latestRelease != undefined) {
    $(selector).html(
      latestArtifactDropdown({
        assets: latestRelease.assets.Windows.filter(asset => !asset.additionalTags.includes("symbols")),
        name: "Windows",
        icon: "fab fa-windows",
        version: latestRelease.version
      }) +
      latestArtifactDropdown({
        assets: latestRelease.assets.Linux.filter(asset => !asset.additionalTags.includes("symbols")),
        name: "Linux",
        icon: "fab fa-linux",
        version: latestRelease.version
      })
    );
    // TODO - macOS
    $(function () {
      $('[data-mdb-toggle="tooltip"]').tooltip()
    });
  }
}

function renderPreviousReleases(category, noScroll) {
  let previousReleases = prevStableReleases;
  let currentPage = currentPagePrevStable;
  let selector = "#stable-table-body";
  if (category == "nightly") {
    previousReleases = prevNightlies;
    currentPage = currentPagePrevNightly;
    selector = "#nightly-table-body";
  }

  $(selector).html('');

  if (previousReleases.length == 0) {
    $(selector).html(tableMessage({
      colspan: 4,
      message: "No Previous Releases to Display!"
    }));
    return;
  }

  let offset = currentPage * pageSize;
  for (var i = 0; i < pageSize && i + offset < previousReleases.length; i++) {
    let release = previousReleases[i + offset];
    let platforms = [];
    platforms.push({
      assets: release.assets.Windows.filter(asset => !asset.additionalTags.includes("symbols")),
      name: "Windows",
      icon: "fab fa-windows"
    });
    platforms.push({
      assets: release.assets.Linux.filter(asset => !asset.additionalTags.includes("symbols")),
      name: "Linux",
      icon: "fab fa-linux"
    });
    if (release.assets.MacOS.length > 0) {
      platforms.push({
        assets: release.assets.MacOS.filter(asset => !asset.additionalTags.includes("symbols")),
        name: "MacOS",
        icon: "fab fa-apple"
      });
    }
    let templateData = {
      releaseName: release.version,
      url: release.url,
      releaseDate: new Date(release.createdAt).toLocaleDateString(),
      platforms: platforms,
      releaseNotes: release.description == undefined ? null : marked(truncateDescription(release.description))
    };
    $(selector).append(releaseRow(templateData));
  }
  $(selector).find('li').find('a:not(.dropdown-item)').attr("target", "_blank");
  renderPaginationButtons(category);
  var elem = document.getElementById(`${category}-list`);
  if (elem != null && !noScroll) {
    elem.scrollIntoView({
      behavior: 'smooth'
    });
  }
  $(function () {
    $('[data-mdb-toggle="tooltip"]').tooltip()
  });
}

function truncateDescription(description) {
  if (description.length > 240) {
    return `${description.substring(0, 240)}...`;
  } else if ((description.match(/\n/g) || []).length > 4) {
    return `${description.split("\n").slice(0, 4).join("\n")}`
  }
  return description;
}

function renderPullRequests(noScroll) {
  // Pull Request Builds
  $('#pull-request-table-body').html('');

  if (passingPRs.length == 0) {
    $("#pull-request-table-body").html(tableMessage({
      colspan: 5,
      message: "No Previous Releases to Display!"
    }));
    return;
  }

  let offset = currentPagePullRequests * pageSize;
  for (var i = 0; i < pageSize && i + offset < passingPRs.length; i++) {
    let pr = passingPRs[i + offset];
    $('#pull-request-table-body').append(pullRequestRow({
      title: pr.title,
      authorName: pr.githubUser,
      updatedAt: new Date(pr.updatedAt).toLocaleDateString(),
      additions: pr.additions,
      deletions: pr.deletions,
      url: pr.link
    }));
  }
  renderPaginationButtons("pull-request");
  var elem = document.getElementById(`pull-requests-list`);
  if (elem != null && !noScroll) {
    elem.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

function renderPaginationButtons(category) {
  let totalCount = totalPrevStable;
  let currentPage = currentPagePrevStable;
  let selector = "#stable-pagination-container";
  let addClass = "page-stable";
  if (category == "nightly") {
    totalCount = totalPrevNightly;
    currentPage = currentPagePrevNightly;
    selector = "#nightly-pagination-container";
    addClass = "page-nightly";
  } else if (category == "pull-request") {
    totalCount = totalPullRequests;
    currentPage = currentPagePullRequests;
    selector = "#pull-request-pagination-container";
    addClass = "page-pr";
  }

  $(selector).html('');
  if (totalCount <= 0) {
    return;
  }
  let totalPages = Math.ceil(totalCount / pageSize);
  let buttonValues = pagination(currentPage, totalPages);
  for (var i = 0; i < buttonValues.length; i++) {
    $(selector).append(pageButtonTemplate({
      val: buttonValues[i],
      disabled: buttonValues[i] === "..." || buttonValues[i] == currentPage + 1,
      addClass: addClass
    }));
  }
  $('.btn-pagination.page-stable').on('click', async function (evt) {
    paginationHandler(evt);
  });
  $('.btn-pagination.page-nightly').on('click', async function (evt) {
    paginationHandler(evt);
  });
  $('.btn-pagination.page-pr').on('click', function (evt) {
    paginationHandler(evt);
  });
}

async function paginationHandler(evt) {
  let category = "stable";
  let tableId = "#stable-table-body";
  let colspan = 4;
  let endPoint = "stableReleases"
  if (evt.target.classList.contains("page-nightly")) {
    category = "nightly";
    tableId = "#nightly-table-body";
    endPoint = "nightlyReleases"
  } else if (evt.target.classList.contains("page-pr")) {
    category = "pull-request";
    tableId = "#pull-request-table-body";
    colspan = 5;
    endPoint = "pullRequests"
  }

  evt.stopPropagation();
  evt.stopImmediatePropagation();
  if (evt.target.value != "...") {
    let currentPage = 0;
    if (category == "stable") {
      currentPagePrevStable = parseInt(evt.target.value) - 1;
      currentPage = currentPagePrevStable;
    } else if (category == "nightly") {
      currentPagePrevNightly = parseInt(evt.target.value) - 1;
      currentPage = currentPagePrevNightly;
    } else {
      currentPagePullRequests = parseInt(evt.target.value) - 1;
      currentPage = currentPagePullRequests;
    }
    let newSize = (currentPage + 1) * pageSize;
    let offset = currentPage * pageSize;
    let fetchMore = false;
    if (category == "stable") {
      fetchMore = newSize > prevStableReleases.length || prevStableReleases[offset] == undefined;
    } else if (category == "nightly") {
      fetchMore = newSize > prevNightlies.length || prevNightlies[offset] == undefined;
    } else {
      fetchMore = newSize > passingPRs.length || passingPRs[offset] == undefined
    }

    if (fetchMore) {
      if ($(tableId).html() != tableLoading({colspan: colspan})) {
        $(tableId).html(tableLoading({colspan: colspan}));
      }
      const response = await fetch(`${baseURL}/${endPoint}?offset=${offset}`);
      if (response.status == 200) {
        const newData = await response.json();
        if (category == "stable") {
          fillBuildArray(prevStableReleases, newData.data, offset);
        } else if (category == "nightly") {
          fillBuildArray(prevNightlies, newData.data, offset);
        } else {
          fillBuildArray(passingPRs, newData.data, offset);
        }
      } else if (response.status == 429) {
        // rate limited
        $(tableId).html(tableMessage({
          colspan: colspan,
          message: "You are Being Rate-Limited - Wait and Try Again"
        }));
        return;
      } else {
        // unexpected error
        $(tableId).html(tableMessage({
          colspan: colspan,
          message: "Unexpected Error Occurred - Please Try Again Later"
        }));
        return;
      }
    }
    if (category == "stable") {
      renderPreviousReleases(category, false);
    } else if (category == "nightly") {
      renderPreviousReleases(category, false);
    } else {
      renderPullRequests(false);
    }
  }
}

function fillBuildArray(arr, newData, offset) {
  // If array isn't as big as the start index, we need to fill up to that point
  if (offset > arr.length) {
    for (var i = 0, newSize = offset - arr.length; i < newSize; i++) {
      arr.push(undefined);
    }
  }
  // We can then fill in the array with the indices provided
  // - if we are out of bounds, push undefined
  // - if there is a value OTHER than undefined, skip, the user is just jumping around pages
  for (var i = 0; i < newData.length; i++) {
    if ((i + offset) >= arr.length) {
      arr.push(newData[i]);
    } else if (arr[i + offset] != undefined) {
      continue;
    } else {
      arr[i + offset] = newData[i];
    }
  }
}

function pagination(current, total) {
  current++;
  if (total <= 1) return [1];
  const center = [current - 2, current - 1, current, current + 1, current + 2],
    filteredCenter = center.filter((p) => p > 1 && p < total),
    includeThreeLeft = current === 5,
    includeThreeRight = current === total - 4,
    includeLeftDots = current > 5,
    includeRightDots = current < total - 4;

  if (includeThreeLeft) filteredCenter.unshift(2)
  if (includeThreeRight) filteredCenter.push(total - 1)

  if (includeLeftDots) filteredCenter.unshift('...');
  if (includeRightDots) filteredCenter.push('...');

  return [1, ...filteredCenter, total]
}
