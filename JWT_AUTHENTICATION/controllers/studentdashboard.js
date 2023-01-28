exports.getStudentDashboardData = (req, res) => {
    res.status(200).json({
        success:true,
        data : "You got access to Student's private Dashboard data in this route"
    })
}

// enter any required code here