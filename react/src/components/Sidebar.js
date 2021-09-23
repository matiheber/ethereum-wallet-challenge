function Sidebar(params) {
    return (

        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

			{/* <!-- Sidebar - Brand --> */}
			<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
				<div className="sidebar-brand-icon">
					<i className="fas fa-chart-line"></i>
				</div>
				<div className="sidebar-brand-text mx-3">Wallets</div>
			</a>


			{/* <!-- Divider --> */}
			<hr className="sidebar-divider my-0"/>

			{/* <!-- Nav Item - Dashboard --> */}
			<li className="nav-item active">
				<a className="nav-link" href="/">
					<i className="fas fa-fw fa-tachometer-alt"></i>
					<span>Dashboard</span></a>
			</li>

			{/* <!-- Divider --> */}
			<hr className="sidebar-divider"/>

			{/* <!-- Heading --> */}
			<div className="sidebar-heading">Actions</div>


			{/* <!-- Divider --> */}
			<hr className="sidebar-divider d-none d-md-block"/>
		</ul>
    );

}

export default Sidebar