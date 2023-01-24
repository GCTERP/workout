exports.getPrivateDashboardData = (req, res, next) => {
    res.status(200).json({
        success:true,
        data : "You got access to private Dashboard data in this route"
    })
}

// enter any required code here