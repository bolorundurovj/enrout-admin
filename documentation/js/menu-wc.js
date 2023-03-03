'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">enrout-admin documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-9dc8960c5b1cd8013fe8fac3e30b9d7c849edd6c9e1f40a70fcd77ea65219232c8e30e2317fe09719bfbf884c0d858d45266eba1029d3a4a320cb9bbc5b02398"' : 'data-target="#xs-components-links-module-AppModule-9dc8960c5b1cd8013fe8fac3e30b9d7c849edd6c9e1f40a70fcd77ea65219232c8e30e2317fe09719bfbf884c0d858d45266eba1029d3a4a320cb9bbc5b02398"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-9dc8960c5b1cd8013fe8fac3e30b9d7c849edd6c9e1f40a70fcd77ea65219232c8e30e2317fe09719bfbf884c0d858d45266eba1029d3a4a320cb9bbc5b02398"' :
                                            'id="xs-components-links-module-AppModule-9dc8960c5b1cd8013fe8fac3e30b9d7c849edd6c9e1f40a70fcd77ea65219232c8e30e2317fe09719bfbf884c0d858d45266eba1029d3a4a320cb9bbc5b02398"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-688762529fff4c537773c5c38d635c6c4c0e7eca7bdb0b05ae641650fec4dc219218f861230c13d149e206e9f9c1298328a5f475c8b657f0604f2e9b0be0f7e6"' : 'data-target="#xs-components-links-module-AuthModule-688762529fff4c537773c5c38d635c6c4c0e7eca7bdb0b05ae641650fec4dc219218f861230c13d149e206e9f9c1298328a5f475c8b657f0604f2e9b0be0f7e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-688762529fff4c537773c5c38d635c6c4c0e7eca7bdb0b05ae641650fec4dc219218f861230c13d149e206e9f9c1298328a5f475c8b657f0604f2e9b0be0f7e6"' :
                                            'id="xs-components-links-module-AuthModule-688762529fff4c537773c5c38d635c6c4c0e7eca7bdb0b05ae641650fec4dc219218f861230c13d149e206e9f9c1298328a5f475c8b657f0604f2e9b0be0f7e6"' }>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetPasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentsModule.html" data-type="entity-link" >DepartmentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DepartmentsModule-f3f552ac53e89ccdac3c2a1d441fa3068683bef68d8b5ac95c476a2435ad8bd88a44275a34ae867fd923aecc57b90b92eba5d8b6d80d28523f614aca036e5f3d"' : 'data-target="#xs-components-links-module-DepartmentsModule-f3f552ac53e89ccdac3c2a1d441fa3068683bef68d8b5ac95c476a2435ad8bd88a44275a34ae867fd923aecc57b90b92eba5d8b6d80d28523f614aca036e5f3d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DepartmentsModule-f3f552ac53e89ccdac3c2a1d441fa3068683bef68d8b5ac95c476a2435ad8bd88a44275a34ae867fd923aecc57b90b92eba5d8b6d80d28523f614aca036e5f3d"' :
                                            'id="xs-components-links-module-DepartmentsModule-f3f552ac53e89ccdac3c2a1d441fa3068683bef68d8b5ac95c476a2435ad8bd88a44275a34ae867fd923aecc57b90b92eba5d8b6d80d28523f614aca036e5f3d"' }>
                                            <li class="link">
                                                <a href="components/DepartmentListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepartmentListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentsRoutingModule.html" data-type="entity-link" >DepartmentsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DocumentsModule.html" data-type="entity-link" >DocumentsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DocumentsRoutingModule.html" data-type="entity-link" >DocumentsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GroupRolesModule.html" data-type="entity-link" >GroupRolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupRolesModule-bdb4470c8fba4b906a9d28b62e6653307788a55c4399386a7131f56d0f632aa20a6e32806d658ad3826555da0da2358e01ee98164896b8c435db1c79d2434569"' : 'data-target="#xs-components-links-module-GroupRolesModule-bdb4470c8fba4b906a9d28b62e6653307788a55c4399386a7131f56d0f632aa20a6e32806d658ad3826555da0da2358e01ee98164896b8c435db1c79d2434569"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupRolesModule-bdb4470c8fba4b906a9d28b62e6653307788a55c4399386a7131f56d0f632aa20a6e32806d658ad3826555da0da2358e01ee98164896b8c435db1c79d2434569"' :
                                            'id="xs-components-links-module-GroupRolesModule-bdb4470c8fba4b906a9d28b62e6653307788a55c4399386a7131f56d0f632aa20a6e32806d658ad3826555da0da2358e01ee98164896b8c435db1c79d2434569"' }>
                                            <li class="link">
                                                <a href="components/GroupRoleListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupRoleListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupRolesRoutingModule.html" data-type="entity-link" >GroupRolesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GroupsModule.html" data-type="entity-link" >GroupsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupsModule-a5e07ec41c85b6bdb0593499e1da8843260d911a8587d7cf71faa3da578068b5952f79b89501c4147b1b11ca5bda17670d7786e4df1178f179647d2b3b11d16d"' : 'data-target="#xs-components-links-module-GroupsModule-a5e07ec41c85b6bdb0593499e1da8843260d911a8587d7cf71faa3da578068b5952f79b89501c4147b1b11ca5bda17670d7786e4df1178f179647d2b3b11d16d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupsModule-a5e07ec41c85b6bdb0593499e1da8843260d911a8587d7cf71faa3da578068b5952f79b89501c4147b1b11ca5bda17670d7786e4df1178f179647d2b3b11d16d"' :
                                            'id="xs-components-links-module-GroupsModule-a5e07ec41c85b6bdb0593499e1da8843260d911a8587d7cf71faa3da578068b5952f79b89501c4147b1b11ca5bda17670d7786e4df1178f179647d2b3b11d16d"' }>
                                            <li class="link">
                                                <a href="components/GroupListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupsRoutingModule.html" data-type="entity-link" >GroupsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IconsProviderModule.html" data-type="entity-link" >IconsProviderModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LibModule.html" data-type="entity-link" >LibModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LibModule-0194906cc8c088cf61333db6e38494474b429e2ec32b625d0554b21fdcbc58a6ce006444f04171de909f4c04211dbe452a74e9c6da965a1a5f9f57d2ad8d93b7"' : 'data-target="#xs-components-links-module-LibModule-0194906cc8c088cf61333db6e38494474b429e2ec32b625d0554b21fdcbc58a6ce006444f04171de909f4c04211dbe452a74e9c6da965a1a5f9f57d2ad8d93b7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LibModule-0194906cc8c088cf61333db6e38494474b429e2ec32b625d0554b21fdcbc58a6ce006444f04171de909f4c04211dbe452a74e9c6da965a1a5f9f57d2ad8d93b7"' :
                                            'id="xs-components-links-module-LibModule-0194906cc8c088cf61333db6e38494474b429e2ec32b625d0554b21fdcbc58a6ce006444f04171de909f4c04211dbe452a74e9c6da965a1a5f9f57d2ad8d93b7"' }>
                                            <li class="link">
                                                <a href="components/DefaultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToastComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToastComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StaffModule.html" data-type="entity-link" >StaffModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StaffRoutingModule.html" data-type="entity-link" >StaffRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudentsModule.html" data-type="entity-link" >StudentsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudentsRoutingModule.html" data-type="entity-link" >StudentsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link" >UsersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WelcomeModule.html" data-type="entity-link" >WelcomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WelcomeModule-542057090dc032580aaca39c1dea2e4bee54b8acc97c86dee88b54328587a4bc287a82f27a36f2d8653c195dc212d940066906d7212eb86245d2bec6b119a68f"' : 'data-target="#xs-components-links-module-WelcomeModule-542057090dc032580aaca39c1dea2e4bee54b8acc97c86dee88b54328587a4bc287a82f27a36f2d8653c195dc212d940066906d7212eb86245d2bec6b119a68f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WelcomeModule-542057090dc032580aaca39c1dea2e4bee54b8acc97c86dee88b54328587a4bc287a82f27a36f2d8653c195dc212d940066906d7212eb86245d2bec6b119a68f"' :
                                            'id="xs-components-links-module-WelcomeModule-542057090dc032580aaca39c1dea2e4bee54b8acc97c86dee88b54328587a4bc287a82f27a36f2d8653c195dc212d940066906d7212eb86245d2bec6b119a68f"' }>
                                            <li class="link">
                                                <a href="components/WelcomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WelcomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WelcomeRoutingModule.html" data-type="entity-link" >WelcomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WorkflowsModule.html" data-type="entity-link" >WorkflowsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WorkflowsModule-ec857b56c5987960b8f0aa6cdb97d5cef598c02c961b3b3ab88d7758c250884eeff5cd719a8e40bc9ba4c3fa667fe7eeff5b81261994ab2ab42a1ceabbb0d3cc"' : 'data-target="#xs-components-links-module-WorkflowsModule-ec857b56c5987960b8f0aa6cdb97d5cef598c02c961b3b3ab88d7758c250884eeff5cd719a8e40bc9ba4c3fa667fe7eeff5b81261994ab2ab42a1ceabbb0d3cc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WorkflowsModule-ec857b56c5987960b8f0aa6cdb97d5cef598c02c961b3b3ab88d7758c250884eeff5cd719a8e40bc9ba4c3fa667fe7eeff5b81261994ab2ab42a1ceabbb0d3cc"' :
                                            'id="xs-components-links-module-WorkflowsModule-ec857b56c5987960b8f0aa6cdb97d5cef598c02c961b3b3ab88d7758c250884eeff5cd719a8e40bc9ba4c3fa667fe7eeff5b81261994ab2ab42a1ceabbb0d3cc"' }>
                                            <li class="link">
                                                <a href="components/WorkflowDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkflowDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkflowListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkflowListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkflowsRoutingModule.html" data-type="entity-link" >WorkflowsRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link" >PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToastMessage.html" data-type="entity-link" >ToastMessage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartmentService.html" data-type="entity-link" >DepartmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupRoleService.html" data-type="entity-link" >GroupRoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupService.html" data-type="entity-link" >GroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderService.html" data-type="entity-link" >LoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link" >ToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkflowService.html" data-type="entity-link" >WorkflowService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/ServerErrorInterceptor.html" data-type="entity-link" >ServerErrorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NoAuthGuard.html" data-type="entity-link" >NoAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Data.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDepartment.html" data-type="entity-link" >IDepartment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDepartmentPayload.html" data-type="entity-link" >IDepartmentPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEntityCount.html" data-type="entity-link" >IEntityCount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGroup.html" data-type="entity-link" >IGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGroupPayload.html" data-type="entity-link" >IGroupPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGroupRole.html" data-type="entity-link" >IGroupRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGroupRolePayload.html" data-type="entity-link" >IGroupRolePayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILoginResponse.html" data-type="entity-link" >ILoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginatedMetadata.html" data-type="entity-link" >IPaginatedMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginatedResponse.html" data-type="entity-link" >IPaginatedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginationParams.html" data-type="entity-link" >IPaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRegistrationRequest.html" data-type="entity-link" >IRegistrationRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITokenPayload.html" data-type="entity-link" >ITokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWorkflow.html" data-type="entity-link" >IWorkflow</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWorkflowExtended.html" data-type="entity-link" >IWorkflowExtended</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWorkflowItem.html" data-type="entity-link" >IWorkflowItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWorkflowItemPayload.html" data-type="entity-link" >IWorkflowItemPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWorkflowPayload.html" data-type="entity-link" >IWorkflowPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});