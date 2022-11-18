describe("Download Page - Desktop", () => {
  beforeEach("ensure the page loads", () => {
    cy.viewport(1024, 768);
  });

  describe("downtime scenario", { scrollBehavior: "center" }, () => {
    before("load page", () => {
      cy.visit("/downloads");
      cy.get(".cc-deny").click();
    });

    it("help guides point to the right page", () => {
      cy.get('[data-test-id="setup-guide"]').its("length").should("eq", 2);
    });

    it("handles downtime gracefully", { scrollBehavior: "center" }, () => {
      cy.get('[data-test-id="downtime-notification"]');
      cy.get('[data-test-id="latest-release-artifacts-loading"]')
        .find("button")
        .its("length")
        .should("eq", 3);
      cy.get("#stable-table-body")
        .find(".skeleton-line")
        .its("length")
        .should("gt", 0);
      cy.get('[data-test-id="latest-nightly-artifacts-loading"]')
        .find("button")
        .its("length")
        .should("eq", 3);
      cy.get("#nightly-table-body")
        .find(".skeleton-line")
        .its("length")
        .should("gt", 0);
    });
  });

  describe("latest artifacts", { scrollBehavior: "center" }, () => {
    before("load page", () => {
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/latestReleasesAndPullRequests",
        },
        { fixture: "downloads/only_latest.json" }
      ).as("getDownloadData");
      cy.visit("/downloads");
      cy.get(".cc-deny").click();
    });

    it(
      "latest buttons populated as expected",
      { scrollBehavior: "center" },
      () => {
        cy.get(
          "#latest-release-artifacts > :nth-child(1) .artifact-dropdown"
        ).click();
        cy.get(
          "#latest-release-artifacts > :nth-child(1) > .dropdown > .dropdown-menu > :nth-child(1) > .dropdown-item"
        ).contains("Windows 32bit");
        cy.get("#latest-release-artifacts > :nth-child(2) .artifact-dropdown")
          .contains("Linux")
          .should("be.disabled");

        cy.get("#latest-nightly-artifacts > :nth-child(1) .artifact-dropdown")
          .contains("Windows")
          .should("be.disabled");
        cy.get(
          "#latest-nightly-artifacts > :nth-child(2) .artifact-dropdown"
        ).click({ force: true });
        cy.get(
          "#latest-nightly-artifacts > :nth-child(2) > .dropdown > .dropdown-menu > :nth-child(1) > .dropdown-item"
        ).contains("AppImage");
      }
    );

    it("pull requests are empty", { scrollBehavior: "center" }, () => {
      cy.get("#pull-request-table-body > tr > td").contains(
        "No Pull Requests to Display!"
      );
    });
  });

  describe("no data to show", { scrollBehavior: "center" }, () => {
    before("load page", () => {
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/latestReleasesAndPullRequests",
        },
        { fixture: "downloads/no_data.json" }
      ).as("getDownloadData");
      cy.visit("/downloads");
      cy.get(".cc-deny").click();
    });

    it("stable releases are empty", { scrollBehavior: "center" }, () => {
      cy.get("#stable-table-body > tr > td").contains(
        "No Releases to Display!"
      );
    });

    it("nightly releases are empty", { scrollBehavior: "center" }, () => {
      cy.get("#nightly-table-body > tr > td").contains(
        "No Releases to Display!"
      );
    });

    it("pull requests are empty", { scrollBehavior: "center" }, () => {
      cy.get("#pull-request-table-body > tr > td").contains(
        "No Pull Requests to Display!"
      );
    });
  });

  describe("multiple pages", { scrollBehavior: "center" }, () => {
    before("load page", () => {
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/latestReleasesAndPullRequests",
        },
        { fixture: "downloads/multi_page.json" }
      ).as("getDownloadData");
      cy.visit("/downloads");
      cy.get(".cc-deny").click();
    });

    it("stable releases", { scrollBehavior: "center" }, () => {
      cy.get("#stable-table-body").find("tr").its("length").should("eq", 10);
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/stableReleases?offset=10",
        },
        { data: [] }
      );
      cy.get("#stable-pagination-container > :nth-child(2) > .btn").click();
      cy.get("#stable-table-body").find("tr").its("length").should("eq", 1);
    });

    it("nightly releases are empty", { scrollBehavior: "center" }, () => {
      cy.get("#nightly-table-body").find("tr").its("length").should("eq", 10);
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/nightlyReleases?offset=10",
        },
        { data: [] }
      );
      cy.get("#nightly-pagination-container > :nth-child(2) > .btn").click({
        force: true,
      });
      cy.get("#nightly-table-body").find("tr").its("length").should("eq", 1);
    });

    it("pull requests are empty", { scrollBehavior: "center" }, () => {
      cy.get("#pull-request-table-body")
        .find("tr")
        .its("length")
        .should("eq", 10);
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/pullRequests?offset=10",
        },
        { data: [] }
      );
      cy.get("#pull-request-pagination-container > :nth-child(2) > .btn").click(
        { force: true }
      );
      cy.get("#pull-request-table-body")
        .find("tr")
        .its("length")
        .should("eq", 1);
    });
  });
});

describe("Download Page - Mobile", () => {
  beforeEach("ensure the page loads", () => {
    cy.viewport(320, 568);
  });

  describe("downtime scenario", { scrollBehavior: "center" }, () => {
    before("load page", () => {
      cy.visit("/downloads");
      cy.get(".cc-deny").click();
    });

    it("help guides point to the right page", () => {
      cy.get('[data-test-id="setup-guide"]').its("length").should("eq", 2);
    });

    it("handles downtime gracefully", { scrollBehavior: "center" }, () => {
      cy.get('[data-test-id="downtime-notification"]');
      cy.get('[data-test-id="latest-release-artifacts-loading"]')
        .find("button")
        .its("length")
        .should("eq", 3);
      cy.get("#stable-table-body")
        .find(".skeleton-line")
        .its("length")
        .should("gt", 0);
      cy.get('[data-test-id="latest-nightly-artifacts-loading"]')
        .find("button")
        .its("length")
        .should("eq", 3);
      cy.get("#nightly-table-body")
        .find(".skeleton-line")
        .its("length")
        .should("gt", 0);
    });
  });

  describe("latest artifacts", { scrollBehavior: "center" }, () => {
    before("load page", () => {
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/latestReleasesAndPullRequests",
        },
        { fixture: "downloads/only_latest.json" }
      ).as("getDownloadData");
      cy.visit("/downloads");
      cy.get(".cc-deny").click();
    });

    it(
      "latest buttons populated as expected",
      { scrollBehavior: "center" },
      () => {
        cy.get(
          "#latest-release-artifacts > :nth-child(1) .artifact-dropdown"
        ).click();
        cy.get(
          "#latest-release-artifacts > :nth-child(1) > .dropdown > .dropdown-menu > :nth-child(1) > .dropdown-item"
        ).contains("Windows 32bit");
        cy.get("#latest-release-artifacts > :nth-child(2) .artifact-dropdown")
          .contains("Linux")
          .should("be.disabled");

        cy.get("#latest-nightly-artifacts > :nth-child(1) .artifact-dropdown")
          .contains("Windows")
          .should("be.disabled");
        cy.get(
          "#latest-nightly-artifacts > :nth-child(2) .artifact-dropdown"
        ).click({ force: true });
        cy.get(
          "#latest-nightly-artifacts > :nth-child(2) > .dropdown > .dropdown-menu > :nth-child(1) > .dropdown-item"
        ).contains("AppImage");
      }
    );

    it("pull requests are empty", { scrollBehavior: "center" }, () => {
      cy.get("#pull-request-table-body > tr > td").contains(
        "No Pull Requests to Display!"
      );
    });
  });

  describe("no data to show", { scrollBehavior: "center" }, () => {
    before("load page", () => {
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/latestReleasesAndPullRequests",
        },
        { fixture: "downloads/no_data.json" }
      ).as("getDownloadData");
      cy.visit("/downloads");
      cy.get(".cc-deny").click();
    });

    it("stable releases are empty", { scrollBehavior: "center" }, () => {
      cy.get("#stable-table-body > tr > td").contains(
        "No Releases to Display!"
      );
    });

    it("nightly releases are empty", { scrollBehavior: "center" }, () => {
      cy.get("#nightly-table-body > tr > td").contains(
        "No Releases to Display!"
      );
    });

    it("pull requests are empty", { scrollBehavior: "center" }, () => {
      cy.get("#pull-request-table-body > tr > td").contains(
        "No Pull Requests to Display!"
      );
    });
  });

  describe("multiple pages", { scrollBehavior: "center" }, () => {
    before("load page", () => {
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/latestReleasesAndPullRequests",
        },
        { fixture: "downloads/multi_page.json" }
      ).as("getDownloadData");
      cy.visit("/downloads");
      cy.get(".cc-deny").click();
    });

    it("stable releases", { scrollBehavior: "center" }, () => {
      cy.get("#stable-table-body").find("tr").its("length").should("eq", 10);
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/stableReleases?offset=10",
        },
        { data: [] }
      );
      cy.get("#stable-pagination-container > :nth-child(2) > .btn").click();
      cy.get("#stable-table-body").find("tr").its("length").should("eq", 1);
    });

    it("nightly releases are empty", { scrollBehavior: "center" }, () => {
      cy.get("#nightly-table-body").find("tr").its("length").should("eq", 10);
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/nightlyReleases?offset=10",
        },
        { data: [] }
      );
      cy.get("#nightly-pagination-container > :nth-child(2) > .btn").click({
        force: true,
      });
      cy.get("#nightly-table-body").find("tr").its("length").should("eq", 1);
    });

    it("pull requests are empty", { scrollBehavior: "center" }, () => {
      cy.get("#pull-request-table-body")
        .find("tr")
        .its("length")
        .should("eq", 10);
      cy.intercept(
        {
          method: "GET",
          url: "http://localhost:3000/v1/pullRequests?offset=10",
        },
        { data: [] }
      );
      cy.get("#pull-request-pagination-container > :nth-child(2) > .btn").click(
        { force: true }
      );
      cy.get("#pull-request-table-body")
        .find("tr")
        .its("length")
        .should("eq", 1);
    });
  });
});
